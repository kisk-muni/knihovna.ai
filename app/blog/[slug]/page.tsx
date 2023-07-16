/* eslint-disable @next/next/no-img-element */
import { formatRelative } from "date-fns";
import Headline from "@/components/headline";
import { getPostBySlug } from "@/lib/mdx";
import Link from "next/link";
import { Fragment } from "react";
import { locale } from "@/lib/date";
import Head from "next/head";
import { createMetadata } from "@/lib/metadata";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const getPageContent = async (slug: string) => {
  const { meta, content } = await getPostBySlug(slug);
  return { meta, content };
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { meta } = await getPageContent(params.slug);
  return createMetadata({
    title: meta.title,
    description: meta.summary,
  });
}

const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const { content, meta } = await getPageContent(params.slug);

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
          <time className="block text-lg text-text/80 mb-4">
            {formatRelative(meta.publishedAt, new Date(), {
              locale,
            })}
          </time>
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
        <div className="container pb-24 prose-lg text-text prose-headings:font-bold prose-ul:list-disc">
          {content}
        </div>
      </article>
    </Fragment>
  );
};

export default BlogPostPage;
