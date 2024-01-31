/* eslint-disable @next/next/no-img-element */
import Headline from "@/components/headline";
import { createMetadata } from "@/lib/metadata";
import { getMaterialsPage } from "@/lib/notion/get-materials-data";
import { MDXRemote } from "next-mdx-remote/rsc";
// import Image from "next/image";
import { compile } from "@/lib/mdx";
import { MaterialsList } from "./materials-list";
import TocNavigation from "@/components/toc-navigation";
import { Button } from "@/components/button";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import FormatedDate from "@/components/formated-date";
import { formatRelative } from "date-fns";
import { cs } from "date-fns/locale";

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
    title: page ? page?.properties.Title.title[0]?.plain_text : "Materiály",
    description:
      page?.properties.Description.rich_text[0]?.plain_text ||
      "Materiály a další výstupy z projektu, které můžete využít pro svou orientaci v praxi.",
  });
}

const MaterialHomePage = () => (
  <main>
    <Headline level="ultra" as="h1" className="mt-2">
      Materiály
    </Headline>
    <MaterialsList />
  </main>
);

const MaterialPage = async ({ params }: { params: { slug?: string[] } }) => {
  const lookupSlug = getLookupSlug(params.slug);
  if (lookupSlug === "materialy") {
    return <MaterialHomePage />;
  }
  const page = await getMaterialsPage(lookupSlug);
  const { content } = await compile(page?.markdownContents || "");
  return (
    <main className="flex gap-x-8">
      <div className="grow">
        <div className="max-w-7xl pr-5 mx-auto">
          <div className="grid grid-cols-12 relative gap-4">
            <div className="relative col-span-12 md:col-span-9 transition-all ease-out duration-100">
              <div className="text-text text-lg normal-case bg-blue-100 py-2 flex items-start px-3 mb-8 rounded-xl">
                <div className="inline-block rounded-full text-blue-600 mt-0.5 mr-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                </div>
                <div className="">
                  <div className="inline-block text-blue-600 font-semibold tracking-tight">
                    {"Tato stránka je rozpracovaná"}
                  </div>
                  <p className="text-base mt-0">
                    Obsah této stránky se bude měnit. Naposledy upraveno{" "}
                    {page?.last_edited_time && (
                      <FormatedDate
                        className="font-bold"
                        originalRelative={true}
                        date={new Date(page?.last_edited_time)}
                      />
                    )}
                    .
                  </p>
                </div>
              </div>
              <div className="my-6">
                <Link href="/materialy">
                  <Button
                    theme="primary"
                    variant="link"
                    className="items-center"
                  >
                    Materiály{" "}
                    <ChevronRightIcon className="ml-2 w-4 h-4 stroke-[3px]" />
                  </Button>
                </Link>
              </div>
              <Headline level="ultra" as="h1" className="mt-2" id="title">
                {page?.properties.Title.title[0].plain_text}
              </Headline>
              <div className="prose-lg text-text prose-headings:font-bold prose-a:text-primary prose-headings:leading-tight prose-ul:list-disc prose-ol:list-decimal">
                {content}
              </div>
            </div>
          </div>
        </div>
      </div>
      {page?.toc && page?.ids && (
        <aside
          className="h-screen flex-shrink-0 w-full md:w-52 pt-8 md:flex flex-col items-start fixed md:sticky top-[83px] z-10 hidden"
          style={{
            minHeight: "calc(100vh - 140px)",
          }}
        >
          <p className="uppercase mt-2 mb-4 text-sm font-medium text-text/80">
            Na této stránce
          </p>
          <TocNavigation
            maxDepth={3}
            toc={
              [
                { text: "Úvod", id: "title", level: 0, children: [] },
                ...page.toc,
              ] || []
            }
            ids={["title", ...page.ids] || []}
          />
        </aside>
      )}
    </main>
  );
};

export default MaterialPage;
