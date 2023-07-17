/* eslint-disable @next/next/no-img-element */
import Headline from "@/components/headline";
import { getAllPostsMeta } from "@/lib/mdx";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import PostCard from "@/components/post/post-card";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description:
    "Nové příspěvky v projektu knihovna.ai: Veřejné knihovny jako místa podpory zaměstnanosti",
});

export default async function BlogPage() {
  const posts = await getAllPostsMeta();
  return (
    <div className={"mt-20"}>
      <div className="mb-14">
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
