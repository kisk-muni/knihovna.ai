import dotenv from "dotenv";
dotenv.config({ path: [".env.local"] });

import { BlogSchema } from "../lib/notion/schema";
import siteConfig from "../site-config";
import { blogPosts, BlogPostTable, users, UserTable } from "../db/schema";
import { getDataToImport } from "./sync-src";

async function importBlogPosts() {
  await getDataToImport<BlogSchema, BlogPostTable>({
    name: "Blog Posts",
    dbSchema: blogPosts,
    dbId: siteConfig.notion.databases.blog,
    getFriendlyDBIdentifier: (item) => {
      return item.name || item.id;
    },
    getFriendlyNotionIdentifier: (item) => {
      return item.properties.Title.title[0].plain_text;
    },
    validateNotionItem: (item) => {
      if (
        !item.properties.Title.title.length ||
        !item.properties.Slug.rich_text.length ||
        !item.properties.Description.rich_text.length
      )
        return false;
      return true;
    },
    mapNotionToDB: (item) => {
      return {
        notionId: item.id,
        name: item.properties.Title.title[0].plain_text,
        slug: item.properties.Slug.rich_text[0].plain_text,
        description: item.properties.Description.rich_text[0].plain_text,
        isPublished: item.properties.State.select.name === "Published",
        isDraft: item.properties.State.select.name === "Draft",
        dateCreated: item.created_time,
        dateLastEdited: item.last_edited_time,
      };
    },
  });
}

(async () => {
  await importBlogPosts();
})();
