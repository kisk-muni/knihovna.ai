import { relations } from "drizzle-orm";
import { pgTable, uuid, text, timestamp, numeric } from "drizzle-orm/pg-core";
import { themesToEpics } from "./themes-to-epics";
import { states, todosToEpics } from "../schema";

export const epics = pgTable("epic", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  notionId: text("notion_id").unique(),
  name: text("name").notNull(),
  content: text("content"),
  dateStart: timestamp("date_start", { mode: "date" }),
  dateEnd: timestamp("date_end", { mode: "date" }),
  stateId: uuid("state_id"),
  progress: numeric("progress"),
});

export type Epic = typeof epics.$inferSelect;

export const epicsRelations = relations(epics, ({ many, one }) => ({
  themes: many(themesToEpics),
  todos: many(todosToEpics),
  state: one(states, {
    fields: [epics.stateId],
    references: [states.id],
  }),
}));
