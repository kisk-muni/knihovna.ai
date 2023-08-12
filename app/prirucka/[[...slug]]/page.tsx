/* eslint-disable @next/next/no-img-element */
import Headline from "@/components/headline";
import { components } from "@/lib/mdx";
import { createMetadata } from "@/lib/metadata";
import { getHandbookPage } from "@/lib/notion/get-handbook-data";
import { MDXRemote } from "next-mdx-remote/rsc";
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
  return (
    <main className="prose-lg text-text prose-headings:font-bold prose-headings:leading-tight prose-ul:list-disc prose-ol:list-decimal">
      <Headline level="ultra" as="h1">
        {page?.properties.Title.title[0].plain_text}
      </Headline>
      <MDXRemote
        source={page?.markdownContents || ""}
        options={{ parseFrontmatter: true }}
        components={components}
      />
    </main>
  );
};

export default HandbookPage;
