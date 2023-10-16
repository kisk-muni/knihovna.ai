import siteConfig, { TeamMember } from "@/site-config";
import getData from "./get-data";
import { BlogSchema, People, QueryResultWithMarkdownContents } from "./schema";
import { mapAuthors } from "./map-authors";

export type PostMeta = {
  slug: string;
  publishedAt: Date;
  title: string;
  authors: TeamMember[];
  summary: string;
};

export type Post = {
  meta: PostMeta;
  content: any;
};

const defaultTitle = "Příspěvek bez názvu";

function getMeta(page: QueryResultWithMarkdownContents<BlogSchema>): PostMeta {
  const properties = page.properties;
  const meta = {
    publishedAt: new Date(properties["Published at"].date.start) || null,
    title: properties?.Title.title[0]?.plain_text || defaultTitle,
    authors: mapAuthors(properties?.Authors),
    summary: properties.Description.rich_text[0]?.plain_text || "",
    slug: properties.Slug.rich_text[0]?.plain_text || "",
  };
  return meta;
}

export async function getBlogPages(): Promise<PostMeta[]> {
  const data = await getData<BlogSchema>(siteConfig.notion.databases.blog, {
    withBlocks: false,
    withRelations: false,
    sorts: [
      {
        property: "Published at",
        direction: "descending",
      },
    ],
    filter: {
      property: "State",
      select: {
        equals: "Published",
      },
    },
  });
  return data.map((page) => getMeta(page));
}

export async function getBlogPage(slug: string): Promise<Post | null> {
  const data = await getData<BlogSchema>(siteConfig.notion.databases.blog, {
    withRelations: false,
    maxDepth: 2,
    withBlocks: true,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  });
  if (data.length === 0) {
    return null;
  }
  const page = data[0];
  const meta = getMeta(page);
  const content = page?.markdownContents || "";
  return {
    meta,
    content,
  };
}
