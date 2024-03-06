import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  uuid,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { states } from "./states";
import {
  todosToCategories,
  todosToEpics,
  todosToSprints,
  todosToSubTodos,
} from "../schema";
import { usersToTodos } from "./users-to-todos";

export const todos = pgTable("todo", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  notionId: text("notion_id").unique(),
  notionUrl: text("notion_url"),
  name: text("name").notNull(),
  isPrivate: boolean("is_private").notNull().default(false),
  storyPoints: integer("story_points"),
  content: text("content"),
  dateCreated: timestamp("date_created", { mode: "date" }),
  dateLastEdited: timestamp("date_last_edited", { mode: "date" }),
  dateStart: timestamp("date_start", { mode: "date" }),
  dateEnd: timestamp("date_end", { mode: "date" }),
  stateId: uuid("state_id"),
});

export type Todo = typeof todos.$inferSelect;

export const todosRelations = relations(todos, ({ many, one }) => ({
  categories: many(todosToCategories),
  sprints: many(todosToSprints),
  epics: many(todosToEpics),
  subTodos: many(todosToSubTodos),
  state: one(states, {
    fields: [todos.stateId],
    references: [states.id],
  }),
  users: many(usersToTodos),
}));
