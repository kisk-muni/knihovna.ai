import notion from "./notion";
import n2m from "./notion2md";
import {
  QueryResult,
  QueryResultWithMarkdownContents,
  Relation,
  TocItem,
} from "@/lib/notion/schema";
import slugify from "slugify";

export async function getPaginatedData<ItemProperties>(
  database_id: string,
  config?: Config
): Promise<QueryResultWithMarkdownContents<ItemProperties>[]> {
  let depth = 1;

  let results = [];
  let data = await notion.databases.query({
    database_id,
    sorts: config?.sorts,
    filter: config?.filter,
  }); /* .results as unknown as QueryResult<ItemProperties>[]; */

  results = [...data.results];

  while (data.has_more && data.next_cursor) {
    data = await notion.databases.query({
      database_id,
      start_cursor: data.next_cursor,
      sorts: config?.sorts,
      filter: config?.filter,
    });
    results = [...results, ...data.results];
  }

  for (const item of results as unknown as QueryResult<ItemProperties>[]) {
    await getItem(item, depth, config);
  }
  return results as unknown as QueryResultWithMarkdownContents<ItemProperties>[];
}

type Config = {
  withRelations?: boolean | string[];
  recursive?: boolean;
  maxDepth?: number;
  withBlocks?: boolean;
  blocksAs?: ("markdown" | "objects" | "toc")[];
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
  filter?: any | any[];
};

export function convertToToc(headings: { level: number; text: string }[]): {
  nestedHeadings: TocItem[];
  ids: string[];
} {
  const ids: string[] = [];
  const nestedHeadings: TocItem[] = [];
  const stack: TocItem[] = [];

  headings.forEach((heading) => {
    const id = slugify(heading.text) || "";
    const newItem: TocItem = {
      level: heading.level,
      text: heading.text,
      id: id,
      children: [],
    };

    ids.push(id);

    while (stack.length > 0 && heading.level <= stack[stack.length - 1].level) {
      stack.pop();
    }

    if (stack.length > 0) {
      stack[stack.length - 1].children.push(newItem);
    } else {
      nestedHeadings.push(newItem);
    }

    stack.push(newItem);
  });

  return { nestedHeadings, ids };
}

export default async function getData<ItemProperties>(
  database_id: string,
  config?: Config
): Promise<QueryResultWithMarkdownContents<ItemProperties>[]> {
  let depth = 1;
  const database = (
    await notion.databases.query({
      database_id,
      sorts: config?.sorts,
      filter: config?.filter,
    })
  ).results as unknown as QueryResult<ItemProperties>[];

  for (const item of database) {
    await getItem(item, depth, config);
  }
  const items = database as QueryResultWithMarkdownContents<ItemProperties>[];
  return items;
}

async function getItem<ItemProperties>(
  item: QueryResult<ItemProperties>,
  depth: number,
  config?: Config
) {
  const defaultConfig: Config = {
    withRelations: false,
    recursive: false,
    maxDepth: 1,
    withBlocks: false,
    blocksAs: ["markdown"],
  };
  const conf = { ...defaultConfig, ...config };
  if (conf?.maxDepth && depth > conf?.maxDepth) {
    return;
  }
  for (const name in item.properties) {
    const property = item.properties[name] as Relation<{}>;
    if (
      property.type === "relation" &&
      (conf?.withRelations ||
        (Array.isArray(conf?.withRelations) &&
          conf?.withRelations.includes(name)))
    ) {
      // too long, might be separated into a function getRelationItems or something
      const items = [];
      for (const relation of property.relation) {
        const response = await notion.pages.retrieve({
          page_id: relation.id,
        });
        if (conf.recursive) {
          await getItem(
            response as unknown as QueryResult<ItemProperties>,
            depth + 1,
            conf
          );
        }
        items.push(response);
      }
      property.items = items as any;
    }
  }
  if (conf?.withBlocks) {
    const { results } = await notion.blocks.children.list({
      block_id: item.id,
    });
    if (conf?.blocksAs?.includes("objects")) {
      item.blocks = results;
    }
    if (conf?.blocksAs?.includes("markdown")) {
      if (conf?.blocksAs?.includes("toc")) {
        const headings = results
          .filter((block: any) => block.type.startsWith("heading"))
          .map((block: any) => {
            const { type } = block;
            return {
              level: parseInt(block.type.split("_")[1]),
              text: block[type].rich_text.length
                ? (block[type].rich_text[0]?.plain_text as string | "")
                : "",
            };
          });
        const { nestedHeadings, ids } = convertToToc(headings);
        (item as QueryResultWithMarkdownContents<ItemProperties>).toc =
          nestedHeadings;
        (item as QueryResultWithMarkdownContents<ItemProperties>).ids = ids;
      }
      const x = await n2m.blocksToMarkdown(results);
      n2m.setCustomTransformer("bookmark", transformBookmark);
      n2m.setCustomTransformer("child_database", transformChildDatabase);
      n2m.setCustomTransformer("image", transformImage);
      (
        item as QueryResultWithMarkdownContents<ItemProperties>
      ).markdownContents = n2m.toMarkdownString(x).parent;
    }
  }
}

export function transformChildDatabase(block: any) {
  return "";
}

export function transformImage(block: any) {
  const { type } = block as any;
  const image = block[type];
  if (image.type == "file")
    return `
    <img src="${image?.file?.url}" />
  `;
  else if (image.type == "external")
    return `
    <img src="${image?.external?.url}" />
  `;
  return "";
}

export function transformBookmark(block: any) {
  const { type, bookmark } = block as {
    type: any;
    bookmark?: {
      caption: { plain_text: string }[];
      url: string;
    };
  };
  return "";
  if (type == "bookmark") {
    return `
    <Bookmark url="${bookmark?.url}" description="${
      bookmark?.caption.length ? bookmark?.caption[0].plain_text : ""
    }" />
  `;
  }
  return "";
}
