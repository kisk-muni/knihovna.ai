import { getMaterialsPages } from "@/lib/notion/get-materials-data";
import { NavItem, Navigation } from "./navigation";
import {
  GuidesSchema,
  QueryResultWithMarkdownContents,
} from "@/lib/notion/schema";

function prepareNavitems(
  parentHref: string,
  items?: QueryResultWithMarkdownContents<GuidesSchema>[]
) {
  if (!items) return undefined;
  const navItems: NavItem[] = items.map((item) => {
    const name = item.properties.Title.title[0].plain_text;
    const slug = item.properties.Slug.rich_text[0]?.plain_text;
    const href =
      parentHref + (slug !== "materialy" ? (slug ? "/" + slug : "") : "");
    return {
      name,
      href,
      items: item.properties["Sub-pages"].items
        ? prepareNavitems(href, item.properties["Sub-pages"].items)
        : undefined,
    };
  });
  return navItems;
}

async function getPagesTree() {
  const pages = await getMaterialsPages();
  const navItems = prepareNavitems("/materialy", pages);
  return navItems;
}

export async function MainNavigation() {
  const items = await getPagesTree();
  return <Navigation items={items} />;
}
