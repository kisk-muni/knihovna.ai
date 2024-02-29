import { relations } from "drizzle-orm";
import { pgTable, text, uuid, integer } from "drizzle-orm/pg-core";
import { epics } from "./epics";
import { themes } from "./themes";
import { todos } from "../schema";

export const states = pgTable("state", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  notionId: text("notion_id").unique(),
  name: text("name").notNull(),
  color: text("color").notNull(),
  order: integer("order"),
});

export const statesRelations = relations(states, ({ many }) => ({
  todos: many(todos),
  themes: many(themes),
  epics: many(epics),
}));
