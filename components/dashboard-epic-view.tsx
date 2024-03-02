import { getEpic } from "@/app/actions";
import { cache } from "react";
import { GroupedTodoList, TodosKanban } from "./ui/todo-views";
import { Squares2X2Icon } from "@heroicons/react/24/solid";
import { type Selection } from "react-aria-components";

const loadEpic = cache(async (id: string, selectedState: Selection) => {
  return await getEpic(id, selectedState);
});

export default async function DashboardEpicView({
  id,
  displayMode,
  selectedState,
}: {
  id: string;
  displayMode: "kanban" | "list";
  selectedState: Selection;
}) {
  const data = await loadEpic(id, selectedState);

  return (
    <div>
      <div className="px-8 py-6 flex items-center">
        <Squares2X2Icon className="w-6 h-6 mr-3 relative text-text/50" />
        <h2 className="font-medium text-2xl">{data?.name}</h2>
      </div>
      {data?.todos && displayMode === "kanban" ? (
        <TodosKanban groups={data?.todos} />
      ) : data?.todos ? (
        <GroupedTodoList groups={data?.todos} />
      ) : null}
    </div>
  );
}
