/* eslint-disable @next/next/no-img-element */
import { getPageContent, components } from "@/lib/mdx";
import { createMetadata } from "@/lib/metadata";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Fragment, Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { meta } = await getPageContent(params.slug, "pages");
  return createMetadata({
    title: meta.title,
    description: meta.summary,
  });
}

const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const { content } = await getPageContent(params.slug, "pages");

  return (
    <Fragment>
      <main className="prose-lg text-text prose-headings:font-bold prose-headings:leading-tight prose-ul:list-disc prose-ol:list-decimal">
        <MDXRemote
          source={content}
          options={{ parseFrontmatter: true }}
          components={components}
        />
      </main>
    </Fragment>
  );
};

export default BlogPostPage;
