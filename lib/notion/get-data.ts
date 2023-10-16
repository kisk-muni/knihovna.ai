import Image from "next/image";
import notion from "./notion";
import n2m from "./notion2md";
import {
  QueryResult,
  QueryResultWithMarkdownContents,
  Relation,
  TocItem,
} from "@/lib/notion/schema";
import slugify from "slugify";
import siteConfig from "@/site-config";

type Config = {
  withRelations?: boolean | string[];
  recursive?: boolean;
  maxDepth?: number;
  withBlocks?: boolean;
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

function convertToToc(headings: { level: number; text: string }[]): TocItem[] {
  const nestedHeadings: TocItem[] = [];
  const stack: TocItem[] = [];

  headings.forEach((heading) => {
    const newItem: TocItem = {
      level: heading.level,
      text: heading.text,
      href: "#" + slugify(heading.text) || "",
      children: [],
    };

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

  return nestedHeadings;
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
      // hacking
      if (name === "To-dos") {
        console.log("getting todos on ", item.id);
        const todos = getData(siteConfig.notion.databases.todos, {
          withBlocks: true,
          filter: {
            property: "Sprint",
            relation: {
              contains: item.id,
            },
          },
        });
        property.items = todos as any;
      } else {
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
    // if ((property as unknown as People).type === "people") {
    // }
  }
  if (conf?.withBlocks) {
    const { results } = await notion.blocks.children.list({
      block_id: item.id,
    });
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
    const toc = convertToToc(headings);
    (item as QueryResultWithMarkdownContents<ItemProperties>).toc = toc;
    const x = await n2m.blocksToMarkdown(results);
    n2m.setCustomTransformer("child_database", transformChildDatabase);
    n2m.setCustomTransformer("image", transformImage);
    (item as QueryResultWithMarkdownContents<ItemProperties>).markdownContents =
      n2m.toMarkdownString(x).parent;
  }
}

function transformChildDatabase(block: any) {
  return "";
}

function transformImage(block: any) {
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
  /*   const data = await getData(id, {
    withPages: false,
  });
  console.log(data);
  if (!child_database[type]?.url) return;
  return `<figure>
    <iframe src="${child_database[type]?.url}"></iframe>
  </figure>`; */
}
