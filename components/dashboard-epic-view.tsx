import { getEpic } from "@/app/actions";
import { cache } from "react";
import { GroupedTodoList, TodosKanban } from "./ui/todo-views";
import { Squares2X2Icon } from "@heroicons/react/24/solid";
import { type Selection } from "react-aria-components";
import DashboardHeader from "./ui/dashboard-header";
import FilterState from "./filter-state";
import FilterDisplayMode from "./filter-display-mode";

const loadEpic = cache(async (id: string, selectedState: Selection) => {
  return await getEpic(id, selectedState);
});

export default async function DashboardEpicView({
  id,
  selectedDisplayModes,
  selectedStates,
}: {
  id: string;
  selectedDisplayModes: Selection;
  selectedStates: Selection;
}) {
  const data = await loadEpic(id, selectedStates);
  if (!data) return null;

  return (
    <div>
      <DashboardHeader className="flex-col">
        <div className="flex items-center mb-1.5">
          <Squares2X2Icon className="w-5 h-5 mr-1" />
          <h2 className="font-medium text-lg">{data?.name}</h2>
        </div>
        <div className="flex mx-0 px-0 justify-between">
          <FilterState />
          <FilterDisplayMode />
        </div>
      </DashboardHeader>
      {selectedDisplayModes !== "all" && selectedDisplayModes.has("kanban") ? (
        <TodosKanban groups={data.todos} />
      ) : data?.todos ? (
        <GroupedTodoList groups={data?.todos} />
      ) : null}
    </div>
  );
}
