import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { todos } from "./todos";
import { categories } from "./categories";

export const todosToCategories = pgTable(
  "todos_to_categories",
  {
    todoId: uuid("todo_id")
      .notNull()
      .references(() => todos.id),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.todoId, t.categoryId] }),
  })
);

export const todosToCategoriesRelations = relations(
  todosToCategories,
  ({ one }) => ({
    category: one(categories, {
      fields: [todosToCategories.categoryId],
      references: [categories.id],
    }),
    todo: one(todos, {
      fields: [todosToCategories.todoId],
      references: [todos.id],
    }),
  })
);
