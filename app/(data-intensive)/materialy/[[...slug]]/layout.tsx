import BackgroundGradient from "@/components/background-gradient";
// import { Button } from "@/components/button";
import Container from "@/components/container";
import {
  DocsSchema,
  QueryResultWithMarkdownContents,
} from "@/lib/notion/schema";
import { getMaterialsPages } from "@/lib/notion/get-materials-data";
import { Pagination, SideNavigation } from "./navigation";
import { Suspense } from "react";

export const revalidate = 3600;

function getAllSlugs(pages: QueryResultWithMarkdownContents<DocsSchema>[]) {
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
  const pages = await getMaterialsPages();
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
  const pages = await getMaterialsPages();
  const navItems = prepareNavitems("/materialy", pages);
  return navItems;
}

function prepareNavitems(
  parentHref: string,
  items?: QueryResultWithMarkdownContents<DocsSchema>[]
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
                <Pagination items={items} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
