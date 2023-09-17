import BackgroundGradient from "@/components/background-gradient";
// import { Button } from "@/components/button";
import Container from "@/components/container";
import {
  GuidesSchema,
  QueryResultWithMarkdownContents,
} from "@/lib/notion/schema";
import { getGuidesPages } from "@/lib/notion/get-guides-data";
import { Pagination, SideNavigation } from "./navigation";
import { Suspense } from "react";

export const revalidate = 3600;

function getAllSlugs(pages: QueryResultWithMarkdownContents<GuidesSchema>[]) {
  const slugs: { slug: string[] }[] = [];
  pages.forEach((page) => {
    const slug = page.properties.Slug.rich_text[0]?.plain_text;
    if (slug) {
      slugs.push({ slug: [slug] });
    }
    const subpages = page.properties["Sub-pages"].items;
    if (subpages) {
      const subslugs = getAllSlugs(subpages);
      subslugs.forEach((subslug) => {
        slugs.push({ slug: [slug, ...subslug.slug] });
      });
    }
  });
  return slugs;
}

export async function generateStaticParams() {
  const pages = await getGuidesPages();
  const slugs = getAllSlugs(pages);
  console.log(slugs);
  return slugs;
}

type NavItem = {
  name: string;
  href: string;
  items?: NavItem[];
};

async function getPagesTree() {
  const pages = await getGuidesPages();
  const navItems = prepareNavitems("/prirucky", pages);
  return navItems;
}

function prepareNavitems(
  parentHref: string,
  items?: QueryResultWithMarkdownContents<GuidesSchema>[]
) {
  if (!items) return undefined;
  const navItems: NavItem[] = items.map((item) => {
    const name = item.properties.Title.title[0].plain_text;
    const slug = item.properties.Slug.rich_text[0]?.plain_text;
    const href =
      parentHref + (slug !== "prirucky" ? (slug ? "/" + slug : "") : "");
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

export default async function MaterialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = await getPagesTree();
  return (
    <div>
      <BackgroundGradient.Radial />
      <Container fullWidth className="pt-[72px] h-full flex gap-x-8">
        <aside
          className="h-screen flex-shrink-0 w-full md:w-52 pt-4 md:flex flex-col items-start fixed md:sticky top-[72px] z-10 hidden"
          style={{
            minHeight: "calc(100vh - 72px)",
          }}
        >
          <Suspense>
            <SideNavigation items={items} />
          </Suspense>
        </aside>
        <div className="grow">
          <div className="max-w-7xl px-5 mx-auto py-16 pb-0">
            <div className="grid grid-cols-12 relative gap-4">
              <div className="relative col-span-12 md:col-span-9 transition-all ease-out duration-100">
                {children}
                <div className="h-px mt-8 mb-6 w-full bg-text/20"></div>
                <Pagination items={items} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
