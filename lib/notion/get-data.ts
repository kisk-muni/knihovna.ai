import notion from "./notion";
import n2m from "./notion2md";
import {
  QueryResult,
  QueryResultWithMarkdownContents,
} from "@/lib/notion/schema";

export default async function getData<ItemProperties>(
  database_id: string,
  config: {
    withPages?: boolean;
    sorts?: Array<
      | {
          property: string;
          direction: "ascending" | "descending";
        }
      | {
          timestamp: "created_time" | "last_edited_time";
          direction: "ascending" | "descending";
        }
    >;
    filter?: any;
  }
): Promise<QueryResultWithMarkdownContents<ItemProperties>[]> {
  const database = (
    await notion.databases.query({
      database_id,
      sorts: config.sorts,
      filter: config.filter,
    })
  ).results as unknown as QueryResult<ItemProperties>[];

  if (config.withPages) {
    for (const item of database) {
      const { results } = await notion.blocks.children.list({
        block_id: item.id,
      });
      const x = await n2m.blocksToMarkdown(results);
      n2m.setCustomTransformer("child_database", transformChildDatabase);
      (
        item as QueryResultWithMarkdownContents<ItemProperties>
      ).markdownContents = n2m.toMarkdownString(x).parent;
    }
    const items = database as QueryResultWithMarkdownContents<ItemProperties>[];
    return items;
  }

  return database;
}

function transformChildDatabase(block: any) {
  const { type, id } = block as any;
  // const child_database = block[type];
  return "";
  /*   const data = await getData(id, {
    withPages: false,
  });
  console.log(data);
  if (!child_database[type]?.url) return;
  return `<figure>
    <iframe src="${child_database[type]?.url}"></iframe>
  </figure>`; */
}
