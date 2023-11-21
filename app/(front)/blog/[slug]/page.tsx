/* eslint-disable @next/next/no-img-element */
import Headline from "@/components/headline";
import FormatedDate from "@/components/formated-date";
import { defaultComponents } from "@/lib/mdx";
import Link from "next/link";
import { Fragment, Suspense } from "react";
import { createMetadata } from "@/lib/metadata";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogPage, getBlogPages } from "@/lib/notion/get-blog-data";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getBlogPage(params.slug);
  return createMetadata({
    title: data ? data.meta.title : "Příspěvek neexistuje",
    description: data?.meta.summary || "",
  });
}

export async function generateStaticParams() {
  const pages = await getBlogPages();
  const slugs = pages.map((page) => ({ slug: page.slug }));
  return slugs;
}

const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const data = await getBlogPage(params.slug);
  if (data == null) {
    return <p>No post on this address :(</p>;
  }
  const { content, meta } = data;

  return (
    <Fragment>
      <nav className="mt-6">
        <Link
          href="/blog"
          className="text-base font-bold text-text/70 hover:text-text"
        >
          ← Všechny příspěvky
        </Link>
      </nav>
      <article>
        <header className="mt-16 mb-6">
          {meta.publishedAt && (
            <FormatedDate
              date={meta.publishedAt}
              relative
              className="block text-lg text-text/80 mb-4"
            />
          )}
          <Headline as="h1" level="ultra">
            {meta.title}
          </Headline>
          <div className="flex flex-wrap -ml-px mr-4 items-center">
            {meta?.authors.map((author, i) => (
              <div
                className="flex -ml-2 mr-4 mb-1 rounded-lg items-center py-1.5 px-2 hover:bg-sheet transition duration-150 ease-out"
                key={i}
              >
                <img
                  className="h-10 w-10 mr-1.5 rounded-full ring-1 ring-gray-100"
                  src={author.avatar}
                  alt=""
                />
                <div>
                  <div className="text-base leading-tight text-text">
                    {author.name}
                  </div>
                  <div className="text-sm text-text/80 leading-none">
                    {author.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </header>
        <div className="container pb-24 prose-lg text-text prose-headings:font-bold prose-headings:leading-tight prose-a:text-primary prose-ul:list-disc prose-ol:list-decimal">
          <Suspense fallback={<div>Loading...</div>}>
            <MDXRemote
              source={content}
              options={{ parseFrontmatter: true }}
              components={defaultComponents}
            />
          </Suspense>
        </div>
      </article>
    </Fragment>
  );
};

export default BlogPostPage;
