/* eslint-disable @next/next/no-img-element */
import { formatRelative } from "date-fns";
import { locale } from "@/lib/date";
import Headline from "@/components/headline";
import { getAllPostsMeta } from "@/lib/mdx";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Nové příspěvky v projektu knihovna.ai: Veřejné knihovny jako místa podpory zaměstnanosti",
};

export default async function BlogPage() {
  const posts = await getAllPostsMeta();
  return (
    <div className={"mt-12"}>
      <div className="mb-12">
        <Headline as="h1" level="ultra">
          Všechny příspěvky
        </Headline>
      </div>
      {posts?.map((post) => (
        <Link href={`blog/${post.slug}`} key={post?.title} className="mt-16">
          <Headline as="h2" level="2" className="mb-0">
            {post?.title}
          </Headline>
          <div className="flex mt-4 text-base">
            <div className="flex ml-1 mr-4 items-center">
              {post?.authors.map((author, i) => (
                <img
                  key={i}
                  className="h-6 w-6 -ml-1 rounded-full ring-1 ring-sheet"
                  src={author.avatar}
                  alt=""
                />
              ))}
            </div>
            <time className="text-base text-gray-500">
              {formatRelative(post.publishedAt, new Date(), {
                locale,
              })}
            </time>
          </div>
        </Link>
      ))}
    </div>
  );
}
