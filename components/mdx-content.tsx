"use client";
import { defaultComponents } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote";

export default function MDXContent({ mdx }: { mdx?: any }) {
  if (!mdx) {
    return "client";
  }
  return (
    <div>
      <MDXRemote {...mdx} />
    </div>
  );
}
