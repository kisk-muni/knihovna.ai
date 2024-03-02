import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { usersToBlogPosts } from "../schema";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  notionId: text("notion_id").unique(),
  name: text("name").notNull(),
  username: text("username").notNull(),
  description: text("description"),
  avatar: text("avatar"),
});

export type User = typeof users.$inferSelect;

export const usersRelations = relations(users, ({ many }) => ({
  blogPosts: many(usersToBlogPosts),
  todos: many(usersToBlogPosts),
}));
