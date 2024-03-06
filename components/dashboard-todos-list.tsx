import { cache } from "react";
import { GroupedTodoList, TodosKanban } from "./ui/todo-views";
import { getTodos } from "@/app/actions";
import { type Selection } from "react-aria-components";

const loadTodos = cache(async (selectedStates: Selection) => {
  return await getTodos(selectedStates);
});

export default async function DashboardTodosList({
  selectedDisplayModes,
  selectedStates,
}: {
  selectedStates: Selection;
  selectedDisplayModes: Selection;
}) {
  const data = await loadTodos(selectedStates);

  if (!data) return null;

  if (selectedDisplayModes !== "all" && selectedDisplayModes.has("kanban")) {
    return (
      <div className="">
        <TodosKanban groups={data} />
      </div>
    );
  }

  return <GroupedTodoList groups={data} />;
}
