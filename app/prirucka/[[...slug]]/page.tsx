/* eslint-disable @next/next/no-img-element */
import Card from "@/components/card";
import Headline from "@/components/headline";
import { components } from "@/lib/mdx";
import { createMetadata } from "@/lib/metadata";
import { getHandbookPage } from "@/lib/notion/get-handbook-data";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { Fragment, Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}) {
  const page = await getHandbookPage(params.slug?.join("/") || "");
  return createMetadata({
    title: page?.properties.Title.title[0]?.plain_text || "",
    description: page?.properties.Description.rich_text[0]?.plain_text || "",
  });
}

const HandbookPage = async ({ params }: { params: { slug?: string[] } }) => {
  const page = await getHandbookPage(params.slug?.join("/") || "");
  const materials = page?.properties["Recommended Materials"].items;
  return (
    <main>
      <Headline level="1" as="h1" className="mt-2">
        {page?.properties.Title.title[0].plain_text}
      </Headline>
      <div className="prose-lg text-text prose-headings:font-bold prose-headings:leading-tight prose-ul:list-disc prose-ol:list-decimal">
        <MDXRemote
          source={page?.markdownContents || ""}
          options={{ parseFrontmatter: true }}
          components={components}
        />
      </div>
      {Array.isArray(materials) && materials.length > 0 && (
        <Fragment>
          <Headline level="3" as="h2" className="mt-8">
            Doporučené materiály
          </Headline>
          <div className="grid grid-cols-1 gap-4">
            {materials.map((resource, i) => {
              return (
                <Link href={resource.properties.URL.url || "#"} key={i}>
                  <Card
                    size="base"
                    theme="white"
                    className="flex shadow hover:shadow-lg overflow-hidden"
                  >
                    <div className="w-32 grow shrink-0 overflow-hidden bg-sheet"></div>
                    <div className="p-4">
                      <p className="text-lg leading-tight mb-2 text-text font-semibold">
                        {resource.properties.Name.title[0].plain_text}{" "}
                      </p>
                      <p className="text-base text-text/70">
                        {
                          resource.properties.Description.rich_text[0]
                            .plain_text
                        }
                      </p>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Fragment>
      )}
    </main>
  );
};

export default HandbookPage;
