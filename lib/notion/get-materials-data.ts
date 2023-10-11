import siteConfig from "@/site-config";
import getData from "./get-data";
import { MaterialsSchema } from "./schema";

export async function getMaterialsPages() {
  const data = await getData<MaterialsSchema>(
    siteConfig.notion.databases.materials,
    {
      withBlocks: false,
      sorts: [
        {
          property: "Order",
          direction: "ascending",
        },
      ],
      filter: {
        and: [
          {
            property: "State",
            select: {
              equals: "Published",
            },
          },
          {
            property: "Parent page",
            relation: {
              is_empty: true,
            },
          },
        ],
      },
    }
  );
  return data;
}

export async function getMaterialsPage(slug: string) {
  const data = await getData<MaterialsSchema>(
    siteConfig.notion.databases.materials,
    {
      withRelations: false,
      maxDepth: 2,
      withBlocks: true,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    }
  );
  if (data.length === 0) {
    return null;
  }
  return data[0];
}
