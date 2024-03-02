import { relations } from "drizzle-orm";
import { pgTable, text, uuid, integer } from "drizzle-orm/pg-core";
import { todosToCategories } from "../schema";

export const categories = pgTable("category", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  notionId: text("notion_id").unique(),
  name: text("name").notNull(),
  color: text("color").notNull(),
  order: integer("order"),
});

export type Category = typeof categories.$inferSelect;

export const categoriesRelations = relations(categories, ({ many }) => ({
  todos: many(todosToCategories),
}));
