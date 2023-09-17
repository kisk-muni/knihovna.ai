import siteConfig, { TeamMember } from "@/site-config";
import getData from "./get-data";
import {
  BlogSchema,
  PageSchema,
  People,
  QueryResultWithMarkdownContents,
} from "./schema";

export type PageMeta = {
  slug: string;
  publishedAt: Date;
  title: string;
  authors: TeamMember[];
  summary: string;
};

export type Page = {
  meta: PageMeta;
  content: any;
};

const defaultTitle = "Příspěvek bez názvu";

function getAuthors(people: People) {
  const authorIds = people.people.map((author) => author.id) || [];
  return siteConfig.team.filter((member) =>
    authorIds.includes(member?.notionId || "")
  );
}

function getMeta(page: QueryResultWithMarkdownContents<BlogSchema>): PageMeta {
  const properties = page.properties;
  const meta = {
    publishedAt: new Date(properties["Published at"].date.start) || null,
    title: properties?.Title.title[0]?.plain_text || defaultTitle,
    authors: getAuthors(properties?.Authors),
    summary: properties.Description.rich_text[0]?.plain_text || "",
    slug: properties.Slug.rich_text[0]?.plain_text || "",
  };
  return meta;
}

export async function getPages(): Promise<PageMeta[]> {
  const data = await getData<PageSchema>(siteConfig.notion.databases.pages, {
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

export async function getPage(slug: string): Promise<Page | null> {
  const data = await getData<PageSchema>(siteConfig.notion.databases.pages, {
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
