import { relations } from "drizzle-orm";
import { pgTable, text, uuid, boolean } from "drizzle-orm/pg-core";
import { usersToBlogPosts } from "./users-to-blog-posts";

export const blogPosts = pgTable("blog_posts", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  notionId: text("notion_id").unique(),
  name: text("name").notNull(),
  slug: text("name"),
  description: text("description"),
  color: text("color").notNull(),
  isDraft: boolean("is_draft").notNull().default(false),
  isPublished: boolean("is_published").notNull().default(false),
  isFeatured: boolean("is_published").notNull().default(false),
});

export const blogPostsRelations = relations(blogPosts, ({ many }) => ({
  users: many(usersToBlogPosts),
}));
