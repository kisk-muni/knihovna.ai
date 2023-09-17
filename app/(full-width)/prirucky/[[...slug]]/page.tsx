/* eslint-disable @next/next/no-img-element */
import Card from "@/components/card";
import Headline from "@/components/headline";
import { defaultComponents } from "@/lib/mdx";
import { createMetadata } from "@/lib/metadata";
import { getGuidesPage } from "@/lib/notion/get-guides-data";
import { getYoutubeId } from "@/lib/youtube-id";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
// import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export const revalidate = 3600;

function getLookupSlug(slug?: string[]) {
  const lookupSlug = slug && slug.length ? slug[slug.length - 1] : "prirucky";
  return lookupSlug;
}

export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}) {
  const lookupSlug = getLookupSlug(params.slug);
  const page = await getGuidesPage(lookupSlug);
  return createMetadata({
    title: page?.properties.Title.title[0]?.plain_text || "",
    description: page?.properties.Description.rich_text[0]?.plain_text || "",
  });
}

const MaterialPage = async ({ params }: { params: { slug?: string[] } }) => {
  const lookupSlug = getLookupSlug(params.slug);
  const page = await getGuidesPage(lookupSlug);
  const materials = page?.properties["Recommended Materials"].items;
  return (
    <main>
      <Headline level="1" as="h1" className="mt-2">
        {page?.properties.Title.title[0].plain_text}
      </Headline>
      <div className="prose-lg text-text prose-headings:font-bold prose-a:text-primary prose-headings:leading-tight prose-ul:list-disc prose-ol:list-decimal">
        <MDXRemote
          source={page?.markdownContents || ""}
          options={{ parseFrontmatter: true }}
          components={defaultComponents}
        />
      </div>
      {Array.isArray(materials) && materials.length > 0 && (
        <Fragment>
          <Headline level="3" as="h2" className="mt-8">
            Doporučujeme
          </Headline>
          <div className="grid grid-cols-1 gap-4">
            {materials.map((resource, i) => {
              const url = resource.properties.URL.url || "#";
              let image = "";
              if (resource.properties.Type.select.name === "Video") {
                image = `https://img.youtube.com/vi/${getYoutubeId(
                  url || ""
                )}/maxresdefault.jpg`;
              } else if (resource.properties.Image.files.length > 0) {
                const file = resource.properties.Image.files[0];
                // typescript complains when simplified
                if (file.type === "external") {
                  image = file.external.url;
                } else {
                  image = file.file.url;
                }
              } else {
                image = "https://knihovna.ai/screenshot?url=" + url;
              }
              return (
                <Link href={url} key={i}>
                  <Card
                    size="base"
                    theme="white"
                    className="flex shadow-sm hover:shadow overflow-hidden border border-text/10 hover:border-text/20"
                  >
                    <div className="p-4">
                      <p className="text-lg leading-tight mb-2 text-text font-semibold">
                        {resource.properties.Name.title[0].plain_text}{" "}
                      </p>
                      <p className="text-base text-text/70">
                        {
                          resource.properties.Description.rich_text[0]
                            .plain_text
                        }
                      </p>
                    </div>
                    <div className="w-52 relative grow shrink-0 overflow-hidden bg-sheet border-l border-text/5">
                      <Image
                        src={image}
                        alt={
                          resource.properties.Description.rich_text[0]
                            .plain_text
                        }
                        layout="fill"
                        objectFit="cover"
                        objectPosition="left top"
                      />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Fragment>
      )}
    </main>
  );
};

export default MaterialPage;
