import siteConfig, { SiteConfig } from "@/site-config";
import notion from "./notion";
import n2m from "./notion2md";
import {
  QueryResult,
  QueryResultWithMarkdownContents,
} from "@/lib/notion/schema";

export default async function getData<ItemProperties>(
  table: keyof SiteConfig["notion"]["databases"],
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
      database_id: siteConfig.notion.databases[table],
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
      (
        item as QueryResultWithMarkdownContents<ItemProperties>
      ).markdownContents = n2m.toMarkdownString(x).parent;
    }
    const items = database as QueryResultWithMarkdownContents<ItemProperties>[];
    return items;
  }

  return database;
}
