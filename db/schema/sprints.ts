import { relations } from "drizzle-orm";
import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { todosToSprints } from "../schema";

export const sprints = pgTable("sprint", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  notionId: text("notion_id").unique(),
  name: text("name"),
  content: text("content"),
  dateStart: timestamp("date_start", { mode: "date" }),
  dateEnd: timestamp("date_end", { mode: "date" }),
});

export type Sprint = typeof sprints.$inferSelect;

export const sprintsRelations = relations(sprints, ({ many }) => ({
  todos: many(todosToSprints),
}));
