/* eslint-disable @next/next/no-img-element */
import Headline from "@/components/headline";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import PostCard from "@/app/(front)/blog/[slug]/post-card";
import { getBlogPages } from "@/lib/notion/get-blog-data";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description:
    "Nové příspěvky v projektu knihovna.ai: Veřejné knihovny jako místa podpory zaměstnanosti",
});

export default async function BlogPage() {
  const posts = await getBlogPages();
  return (
    <div>
      <div className="mt-12 mb-18">
        <Headline as="h1" level="ultra">
          Všechny příspěvky
        </Headline>
      </div>
      <div className="flex flex-col">
        {posts.map((post, i) => (
          <PostCard post={post} key={i} className="-mx-6" />
        ))}
      </div>
    </div>
  );
}
