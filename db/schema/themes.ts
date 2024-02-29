import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { themesToEpics } from "./themes-to-epics";
import { states } from "../schema";

export const themes = pgTable("theme", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  notionId: text("notion_id").unique(),
  name: text("name").notNull(),
  content: text("content"),
  dateStart: timestamp("date_start", { mode: "date" }),
  dateEnd: timestamp("date_end", { mode: "date" }),
  stateId: uuid("state_id"),
});

export type Theme = typeof themes.$inferSelect;

export const themesRelations = relations(themes, ({ many, one }) => ({
  epics: many(themesToEpics),
  state: one(states, {
    fields: [themes.stateId],
    references: [states.id],
  }),
}));
