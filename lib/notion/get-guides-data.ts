import siteConfig from "@/site-config";
import getData from "./get-data";
import { GuidesSchema } from "./schema";

export async function getGuidesPages() {
  const data = await getData<GuidesSchema>(siteConfig.notion.databases.guides, {
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
  return data;
}

export async function getGuidesPage(slug: string) {
  const data = await getData<GuidesSchema>(siteConfig.notion.databases.guides, {
    withRelations: ["Recommended Materials"],
    maxDepth: 2,
    withBlocks: true,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  });
  if (data.length === 0) {
    return null;
  }
  return data[0];
}
