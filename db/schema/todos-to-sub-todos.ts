import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { todos } from "./todos";

export const todosToSubTodos = pgTable(
  "todos_to_sub_todos",
  {
    todoId: uuid("todo_id")
      .notNull()
      .references(() => todos.id),
    subTodoId: uuid("sub_todo_id")
      .notNull()
      .references(() => todos.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.todoId, t.subTodoId] }),
  })
);

export const todosToSubTodosRelation = relations(
  todosToSubTodos,
  ({ one }) => ({
    todo: one(todos, {
      fields: [todosToSubTodos.todoId],
      references: [todos.id],
    }),
    subTodo: one(todos, {
      fields: [todosToSubTodos.subTodoId],
      references: [todos.id],
    }),
  })
);
