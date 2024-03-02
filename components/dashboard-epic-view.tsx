import { getEpic } from "@/app/actions";
import { cache } from "react";
import { TodoListItem } from "./ui/todo-views";
import { Squares2X2Icon } from "@heroicons/react/24/solid";

const loadEpic = cache(async (id: string) => {
  return await getEpic(id);
});

export default async function DashboardEpicView({ id }: { id: string }) {
  const data = await loadEpic(id);

  return (
    <div>
      <div className="px-8 py-6 border-b flex items-center">
        <Squares2X2Icon className="w-6 h-6 mr-3 relative text-text/50" />
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
