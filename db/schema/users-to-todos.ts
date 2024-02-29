import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { todos } from "./todos";

export const usersToTodos = pgTable(
  "users_to_todos",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    todoId: uuid("todo_id")
      .notNull()
      .references(() => todos.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.todoId] }),
  })
);

export const usersToTodosRelation = relations(usersToTodos, ({ one }) => ({
  todo: one(todos, {
    fields: [usersToTodos.todoId],
    references: [todos.id],
  }),
  user: one(users, {
    fields: [usersToTodos.userId],
    references: [users.id],
  }),
}));
