import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { todos } from "./todos";
import { sprints } from "./sprints";

export const todosToSprints = pgTable(
  "todos_to_sprints",
  {
    todoId: uuid("todo_id")
      .notNull()
      .references(() => todos.id),
    sprintId: uuid("sprinit_id")
      .notNull()
      .references(() => sprints.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.todoId, t.sprintId] }),
  })
);

export const todosToSprintsRelations = relations(todosToSprints, ({ one }) => ({
  sprint: one(sprints, {
    fields: [todosToSprints.sprintId],
    references: [sprints.id],
  }),
  todo: one(todos, {
    fields: [todosToSprints.todoId],
    references: [todos.id],
  }),
}));
