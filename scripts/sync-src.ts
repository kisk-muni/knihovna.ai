import dotenv from "dotenv";
dotenv.config({ path: [".env.local"] });

import { PgTable, PgUpdateSetSource, PgInsertValue } from "drizzle-orm/pg-core";
import { User } from "../lib/notion/schema";
import { getPaginatedData } from "../lib/notion/get-data";
import { db } from "../db";
import { inArray } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { getTableColumns } from "drizzle-orm";
import { getTableConfig } from "drizzle-orm/pg-core";

export type QueryResult<Properties> = {
  id: string;
  url: string;
  created_time: Date | null;
  last_edited_time: Date | null;
  created_by: User;
  last_edited_by: User;
  cover: any | null;
  public_url: string | null;
  properties: Properties;
  blocks?: any[];
};

export async function getDataToImport<NotionSchema, TTable extends PgTable>({
  name,
  dbSchema,
  dbId,
  getFriendlyDBIdentifier,
  getFriendlyNotionIdentifier,
  validateNotionItem,
  mapNotionToDB,
}: {
  name: string;
  dbSchema: TTable;
  dbId: string;
  getFriendlyDBIdentifier: (item: any) => string;
  getFriendlyNotionIdentifier: (item: QueryResult<NotionSchema>) => string;
  validateNotionItem: (value: QueryResult<NotionSchema>, i?: number) => boolean;
  mapNotionToDB: (
    value: QueryResult<NotionSchema>,
    i?: number
  ) => PgInsertValue<TTable>;
}) {
  const notionData = await getPaginatedData<NotionSchema>(dbId).then((data) =>
    data.map((item) => {
      const created_time = item.created_time
        ? new Date(item.created_time)
        : null;
      const last_edited_time = item.last_edited_time
        ? new Date(item.last_edited_time)
        : null;
      return {
        ...item,
        created_time,
        last_edited_time,
      };
    })
  );

  const existingData = await db.select().from(dbSchema);
  const infoObj: {
    name: string;
    status: "created" | "updated" | "deleted" | "skipped";
  }[] = [];
  // items that are in notion but not in the db
  const toCreate = notionData.filter(
    (item) =>
      !existingData.some((existingItem) => existingItem.notionId === item.id)
  );

  // items that are in the db but changed
  const toUpdate = notionData.filter((item) => {
    const existingItem = existingData.find(
      (existingItem) => existingItem.notionId === item.id
    );
    if (!existingItem) return false;
    return (
      existingItem.dateCreated !== item.created_time ||
      existingItem.dateLastEdited !== item.last_edited_time
    );
  });

  // items that are in the db but not in notion
  const toDelete = existingData
    .filter(
      (item) =>
        !notionData.some((notionItem) => notionItem.id === item.notionId)
    )
    .map((item) => item.id);

  const toUpsert = [toCreate, toUpdate].flat();

  // @ts-ignore
  if (dbSchema.id && toDelete.length > 0) {
    const deleted = await db
      .delete(dbSchema)
      // @ts-ignore
      .where(inArray(dbSchema.id, toDelete))
      .returning();
    deleted.forEach((item) => {
      // @ts-ignore
      infoObj.push({ name: getFriendlyDBIdentifier(item), status: "deleted" });
    });
  }

  const validToUpsert = toUpsert.filter((item, i) => {
    const isValid = validateNotionItem(item, i);
    if (!isValid) {
      infoObj.push({
        name: getFriendlyNotionIdentifier(item),
        status: "skipped",
      });
      console.info(
        `\n\nSkipping invalid ${name} item \n`,
        JSON.stringify(item)
      );
    }
    return isValid;
  });

  if (validToUpsert.length > 0) {
    const inserted = await db
      .insert(dbSchema)
      .values(validToUpsert.map((val, i) => mapNotionToDB(val, i)))
      .onConflictDoUpdate({
        // @ts-ignore
        target: [dbSchema.notionId],
        set: conflictUpdateSetAllColumns(dbSchema),
      })
      .returning();

    inserted.forEach((item) => {
      // @ts-ignore
      infoObj.push({ name: getFriendlyDBIdentifier(item), status: "upserted" });
    });
  }

  renderInfo(infoObj);
}

// Snipped by tjapa
// https://github.com/drizzle-team/drizzle-orm/issues/1728#issuecomment-1998494043
export function conflictUpdateSetAllColumns<TTable extends PgTable>(
  table: TTable
): PgUpdateSetSource<TTable> {
  const columns = getTableColumns(table);
  const { name: tableName } = getTableConfig(table);
  const conflictUpdateSet = Object.entries(columns).reduce(
    (acc, [columnName, columnInfo]) => {
      if (!columnInfo.default) {
        // @ts-ignore
        acc[columnName] = sql.raw(
          `COALESCE(excluded.${columnInfo.name}, ${tableName}.${columnInfo.name})`
        );
      }
      return acc;
    },
    {}
  ) as PgUpdateSetSource<TTable>;
  return conflictUpdateSet;
}

function renderInfo(infoObj: { name: string; status: string }[]) {
  console.info("\n\nSync info:/\n\n");

  infoObj.sort((a, b) => {
    if (a.status === b.status) {
      return a.name.localeCompare(b.name);
    }
    return a.status.localeCompare(b.status);
  });

  infoObj.forEach((item) => {
    console.info(`[${item.status.toUpperCase()}]: ${item.name}`);
  });

  const statusCount = infoObj.reduce((acc, item) => {
    if (!acc[item.status]) acc[item.status] = 0;
    acc[item.status]++;
    return acc;
  }, {} as Record<string, number>);

  console.info(
    Object.entries(statusCount)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([status, count]) => {
        return `${status.toUpperCase()}: ${count}`;
      }),
    "\n"
  );
}
