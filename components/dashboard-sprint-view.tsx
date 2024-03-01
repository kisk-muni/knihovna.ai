import { getSprint } from "@/app/actions";
import { cache } from "react";
import { TodoListItem } from "./ui/todo-list-item";

const loadSprint = cache(async (id: string) => {
  return await getSprint(id);
});

export default async function DashboardSprintView({ id }: { id: string }) {
  const data = await loadSprint(id);

  return (
    <div>
      <div className="px-8 py-6 border-b">
        <h2 className="font-medium text-2xl">{data?.name}</h2>
      </div>
      <div>
        <p className="text-text px-8 py-2 border-b text-sm font-medium">
          Úkoly
        </p>
      </div>
      {data?.todos.map((todo, t) => (
        <TodoListItem todo={todo.todo} key={t} />
      ))}
    </div>
  );
}
