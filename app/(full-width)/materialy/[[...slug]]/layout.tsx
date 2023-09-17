import BackgroundGradient from "@/components/background-gradient";
// import { Button } from "@/components/button";
import Container from "@/components/container";
import {
  GuidesSchema,
  QueryResultWithMarkdownContents,
} from "@/lib/notion/schema";
import { getMaterialsPages } from "@/lib/notion/get-materials-data";
import { Navigation } from "./navigation";
import { Suspense } from "react";
import { usePathname } from "next/navigation";

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

export default async function MaterialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const items = await getPagesTree();
  return (
    <div>
      <BackgroundGradient.Radial />
      <Container fullWidth className="pt-[72px] h-full flex gap-x-8">
        <div className="grow">
          <div className="max-w-5xl mx-auto py-16 pb-0">{children}</div>
        </div>
      </Container>
    </div>
  );
}
