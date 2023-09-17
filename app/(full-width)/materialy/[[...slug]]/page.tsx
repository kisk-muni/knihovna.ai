/* eslint-disable @next/next/no-img-element */
import Card from "@/components/card";
import Headline from "@/components/headline";
import { createMetadata } from "@/lib/metadata";
import { getMaterialsPage } from "@/lib/notion/get-materials-data";
import { MDXRemote } from "next-mdx-remote/rsc";
// import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { components } from "./mdx";
import { MainNavigation } from "./main-navigation";

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
  const page = await getMaterialsPage(lookupSlug);
  return (
    <main>
      <Headline level="1" as="h1" className="mt-2">
        {page?.properties.Title.title[0].plain_text}
      </Headline>
      <div className="prose-lg text-text prose-headings:font-bold prose-a:text-primary prose-headings:leading-tight prose-ul:list-disc prose-ol:list-decimal">
        <MDXRemote
          source={page?.markdownContents || ""}
          options={{ parseFrontmatter: true }}
          components={components}
        />
        {lookupSlug === "materialy" && <MainNavigation />}
      </div>
    </main>
  );
};

export default MaterialPage;
