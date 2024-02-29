import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { todos } from "./todos";
import { epics } from "./epics";

export const todosToEpics = pgTable(
  "todos_to_epics",
  {
    todoId: uuid("todo_id")
      .notNull()
      .references(() => todos.id),
    epicId: uuid("epic_id")
      .notNull()
      .references(() => epics.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.todoId, t.epicId] }),
  })
);

export const todosToEpicsRelations = relations(todosToEpics, ({ one }) => ({
  epic: one(epics, {
    fields: [todosToEpics.epicId],
    references: [epics.id],
  }),
  todo: one(todos, {
    fields: [todosToEpics.todoId],
    references: [todos.id],
  }),
}));
