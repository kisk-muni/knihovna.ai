import BackgroundGradient from "@/components/background-gradient";
// import { Button } from "@/components/button";
import Container from "@/components/container";
import {
  GuidesSchema,
  QueryResultWithMarkdownContents,
} from "@/lib/notion/schema";
import { getMaterialsPages } from "@/lib/notion/get-materials-data";

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

export default async function MaterialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const items = await getPagesTree();
  return (
    <div>
      <BackgroundGradient.Radial />
      <Container size="max" className="h-full">
        <div className="mx-auto py-8">{children}</div>
      </Container>
    </div>
  );
}
