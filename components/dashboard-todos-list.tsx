import { cache } from "react";
import { TodoListItem } from "./ui/todo-list-item";
import { getTodos } from "@/app/actions";

const loadTodos = cache(async () => {
  return await getTodos();
});

export default async function DashboardTodosList() {
  const data = await loadTodos();

  return (
    <div>
      {data.map((todo, t) => (
        <TodoListItem todo={todo} key={t} />
      ))}
    </div>
  );
}
