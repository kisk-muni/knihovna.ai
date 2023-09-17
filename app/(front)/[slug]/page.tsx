/* eslint-disable @next/next/no-img-element */
import { defaultComponents } from "@/lib/mdx";
import { createMetadata } from "@/lib/metadata";
import { getPage, getPages } from "@/lib/notion/get-pages-data";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Fragment } from "react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getPage(params.slug);
  return createMetadata({
    title: data ? data.meta.title : "Stránka neexistuje",
    description: data ? data.meta.summary : "",
  });
}

export async function generateStaticParams() {
  const pages = await getPages();
  const slugs = pages.map((page) => ({ params: { slug: page.slug } }));
  return slugs;
}

const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const data = await getPage(params.slug);
  if (!data) {
    return <p>Stránka neexistuje :(</p>;
  }
  const { content } = data;
  return (
    <Fragment>
      <main className="prose-lg text-text prose-headings:font-bold prose-headings:leading-tight prose-ul:list-disc prose-ol:list-decimal">
        <MDXRemote
          source={content}
          options={{ parseFrontmatter: true }}
          components={defaultComponents}
        />
      </main>
    </Fragment>
  );
};

export default BlogPostPage;
