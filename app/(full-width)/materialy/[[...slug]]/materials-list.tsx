import { getMaterialsPages } from "@/lib/notion/get-materials-data";
import { MaterialNavItem, List } from "./list";
import {
  MaterialsSchema,
  QueryResultWithMarkdownContents,
} from "@/lib/notion/schema";

function prepareNavitems(
  parentHref: string,
  items?: QueryResultWithMarkdownContents<MaterialsSchema>[]
) {
  if (!items) return undefined;
  const navItems: MaterialNavItem[] = items.map((item) => {
    const name = item.properties.Title.title[0].plain_text;
    const slug = item.properties.Slug.rich_text[0]?.plain_text;
    const type = item.properties["Material type"].select.name;
    const publishedAt = item.properties["Published at"].date.start;
    const description =
      item.properties["Description"]?.rich_text[0]?.plain_text;
    const href =
      parentHref + (slug !== "materialy" ? (slug ? "/" + slug : "") : "");
    return {
      type,
      name,
      description,
      publishedAt: publishedAt ? new Date(publishedAt) : undefined,
      href,
    };
  });
  return navItems;
}

async function getPagesTree() {
  const pages = await getMaterialsPages();
  const navItems = prepareNavitems("/materialy", pages);
  return navItems?.sort(
    (a, b) =>
      (b?.publishedAt?.getTime() || 0) - (a?.publishedAt?.getTime() || 0)
  );
}

export async function MaterialsList() {
  const items = await getPagesTree();
  return <List items={items} />;
}
