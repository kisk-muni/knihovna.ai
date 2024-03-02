import { getSprint } from "@/app/actions";
import { cache } from "react";
import { GroupedTodoList, TodosKanban } from "./ui/todo-views";
import { SprintIcon } from "./ui/sprint-icon";

const loadSprint = cache(async (id: string) => {
  return await getSprint(id);
});

export default async function DashboardSprintView({
  id,
  displayMode = "kanban",
}: {
  id: string;
  displayMode: "list" | "kanban";
}) {
  const data = await loadSprint(id);
  if (!data) return null;

  return (
    <div>
      <div className="px-8 py-6 flex items-center">
        <SprintIcon
          isActive={data.isActive}
          isPast={data.isPast}
          className="w-6 h-6 mr-4"
        />
        <h2 className="font-medium text-2xl">{data?.name}</h2>
      </div>
      {displayMode === "kanban" ? (
        <TodosKanban groups={data?.todos} />
      ) : (
        <GroupedTodoList groups={data?.todos} />
      )}
    </div>
  );
}
