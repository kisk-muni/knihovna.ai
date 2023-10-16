/* eslint-disable @next/next/no-img-element */
import Headline from "@/components/headline";
import { createMetadata } from "@/lib/metadata";
import { getMaterialsPage } from "@/lib/notion/get-materials-data";
import { MDXRemote } from "next-mdx-remote/rsc";
// import Image from "next/image";
import { components } from "./mdx";
import { MaterialsList } from "./materials-list";
import TocNavigation from "@/components/toc-navigation";

export const revalidate = 3600;

function getLookupSlug(slug?: string[]) {
  const lookupSlug = slug && slug.length ? slug[slug.length - 1] : "materialy";
  return lookupSlug;
}

export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}) {
  const lookupSlug = getLookupSlug(params.slug);
  const page = await getMaterialsPage(lookupSlug);
  return createMetadata({
    title: page?.properties.Title.title[0]?.plain_text || "",
    description: page?.properties.Description.rich_text[0]?.plain_text || "",
  });
}

const MaterialPage = async ({ params }: { params: { slug?: string[] } }) => {
  const lookupSlug = getLookupSlug(params.slug);
  if (lookupSlug === "materialy") {
    return (
      <main>
        <Headline level="ultra" as="h1" className="mt-2">
          Materiály
        </Headline>
        <MaterialsList />
      </main>
    );
  }
  const page = await getMaterialsPage(lookupSlug);

  return (
    <main className="flex gap-x-8">
      <aside
        className="h-screen flex-shrink-0 w-full md:w-52 pt-4 md:flex flex-col items-start fixed md:sticky top-[48px] z-10 hidden"
        style={{
          minHeight: "calc(100vh - 72px)",
        }}
      >
        <p className="uppercase mt-2 mb-4 text-sm font-medium text-text">
          Na této stránce
        </p>
        <div className="h-px mb-6 w-full bg-[#C8C8C8]"></div>
        <TocNavigation maxDepth={3} items={page?.toc} />
      </aside>
      <div className="grow">
        <div className="max-w-7xl px-5 mx-auto">
          <div className="grid grid-cols-12 relative gap-4">
            <div className="relative col-span-12 md:col-span-9 transition-all ease-out duration-100">
              <Headline level="ultra" as="h1" className="mt-2">
                {page?.properties.Title.title[0].plain_text}
              </Headline>
              <div className="prose-lg text-text prose-headings:font-bold prose-a:text-primary prose-headings:leading-tight prose-ul:list-disc prose-ol:list-decimal">
                <MDXRemote
                  source={page?.markdownContents || ""}
                  options={{ parseFrontmatter: true }}
                  components={components}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MaterialPage;
