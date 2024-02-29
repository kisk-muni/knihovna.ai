/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Card from "@/components/ui/card";
import Headline from "@/components/ui/headline";
import { PostMeta } from "@/lib/notion/get-blog-data";
import FormatedDate from "@/components/ui/formated-date";
import classNames from "classnames";

export default function PostCard({
  post,
  primary = false,
  className,
}: {
  post: PostMeta;
  primary?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`blog/${post.slug}`}
      key={post?.title}
      className={classNames("block grow", className)}
    >
      <Card
        size="md"
        className={classNames("py-4", {
          "bg-[#FCF2E8] hover:bg-[#f3e6d9]": primary,
          "bg-transparent hover:bg-sheet": !primary,
        })}
      >
        <Headline as="h3" level="2" className="mb-0 font-bold">
          {post?.title}
        </Headline>
        <div className="flex -mt-1 text-base items-center">
          <div className="flex ml-1 mr-6">
            {post?.authors.map((author, i) => (
              <div
                key={i}
                className="h-6 w-6 -ml-1 rounded-full ring-1 ring-white overflow-hidden"
              >
                <img src={author.avatar} alt={author.name} />
              </div>
            ))}
          </div>
          <FormatedDate
            date={post.publishedAt}
            relative
            className="text-lg text-text/80"
          />
        </div>
      </Card>
    </Link>
  );
}
