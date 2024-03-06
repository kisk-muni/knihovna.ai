import { getSprint } from "@/app/actions";
import { cache } from "react";
import { GroupedTodoList, TodosKanban } from "./ui/todo-views";
import { SprintIcon } from "./ui/sprint-icon";
import { type Selection } from "react-aria-components";
import FilterDisplayMode from "@/components/filter-display-mode";
import FilterState from "@/components/filter-state";
import DashboardHeader from "@/components/ui/dashboard-header";

const loadSprint = cache(async (id: string, selectedStates: Selection) => {
  return await getSprint(id, selectedStates);
});

export default async function DashboardSprintView({
  id,
  selectedDisplayModes,
  selectedStates,
}: {
  id: string;
  selectedDisplayModes: Selection;
  selectedStates: Selection;
}) {
  const data = await loadSprint(id, selectedStates);
  if (!data) return null;

  return (
    <div>
      <DashboardHeader className="flex-col">
        <div className="flex items-center mb-1.5">
          <SprintIcon
            isActive={data.isActive}
            isPast={data.isPast}
            className="w-5 h-5 mr-1"
          />
          <h2 className="font-medium text-lg">{data?.name}</h2>
        </div>
        <div className="flex mx-0 px-0 justify-between">
          <FilterState />
          <FilterDisplayMode />
        </div>
      </DashboardHeader>
      {selectedDisplayModes !== "all" && selectedDisplayModes.has("kanban") ? (
        <TodosKanban groups={data?.todos} />
      ) : (
        <GroupedTodoList groups={data?.todos} />
      )}
    </div>
  );
}
