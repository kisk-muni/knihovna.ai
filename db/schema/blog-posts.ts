import { relations } from "drizzle-orm";
import { pgTable, text, uuid, boolean, timestamp } from "drizzle-orm/pg-core";
import { usersToBlogPosts } from "./users-to-blog-posts";

export const blogPosts = pgTable("blog_posts", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  notionId: text("notion_id").unique(),
  name: text("name").notNull(),
  slug: text("slug"),
  description: text("description"),
  content: text("content"),
  isDraft: boolean("is_draft").notNull().default(false),
  isPublished: boolean("is_published").notNull().default(false),
  dateCreated: timestamp("date_created", { mode: "date" }),
  dateLastEdited: timestamp("date_last_edited", { mode: "date" }),
});

export type BlogPostTable = typeof blogPosts;

export type BlogPost = typeof blogPosts.$inferSelect;

export const blogPostsRelations = relations(blogPosts, ({ many }) => ({
  users: many(usersToBlogPosts),
}));
