import { getBlogPages } from "@/lib/notion/get-blog-data";
import Container from "./ui/container";
import PostCard from "@/app/(front)/blog/[slug]/post-card";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function SectionNews() {
  const posts = await getBlogPages();
  const recentPosts = posts.slice(0, 1);
  return (
    <>
      {recentPosts.length > 0 && (
        <section className="pt-12 lg:pt-20">
          <Container>
            <h2 className="block uppercase text-base font-semibold text-text/60 mb-4">
              Aktuálně v projektu
            </h2>
            <div className="flex flex-col md:flex-row gap-y-3 gap-x-3">
              {recentPosts.map((post, i) => (
                <PostCard primary post={post} key={i} />
              ))}
              {recentPosts.length > 1 && (
                <Link
                  href="/blog"
                  className="block flex items-stretch text-text/80 hover:text-text"
                >
                  <Button
                    theme="gray"
                    variant="ghost"
                    className="flex justify-center md:justify-between items-center gap-x-4 w-full px-0 md:px-6"
                  >
                    <div className="text-left">
                      Další <br className="hidden md:inline-block" />
                      příspěvky
                    </div>
                    <div>→</div>
                  </Button>
                </Link>
              )}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
