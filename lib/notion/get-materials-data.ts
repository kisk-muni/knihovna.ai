import siteConfig from "@/site-config";
import getData from "./get-data";
import { DocsSchema } from "./schema";

export async function getMaterialsPages() {
  const data = await getData<DocsSchema>(siteConfig.notion.databases.handbook, {
    withBlocks: false,
    withRelations: ["Sub-pages"],
    sorts: [
      {
        property: "Order",
        direction: "ascending",
      },
    ],
    filter: {
      property: "Parent page",
      relation: {
        is_empty: true,
      },
    },
  });
  // console.log(data.map((page) => page.properties.Slug.rich_text[0].text));
  return data;
}

export async function getMaterialsPage(slug: string) {
  const data = await getData<DocsSchema>(siteConfig.notion.databases.handbook, {
    withRelations: ["Sub-pages", "Recommended Materials"],
    recursive: true,
    maxDepth: 3,
    withBlocks: true,
    filter: {
      property: "Slug",
      rich_text: {
        equals: "/" + slug,
      },
    },
  });
  // console.log(data.map((page) => page.properties));
  if (data.length === 0) {
    return null;
  }
  return data[0];
}
