import { cache } from "react";
import { GroupedTodoList, TodosKanban } from "./ui/todo-views";
import { getTodos } from "@/app/actions";
import { type Selection } from "react-aria-components";

const loadTodos = cache(async (selectedStates: Selection) => {
  return await getTodos(selectedStates);
});

export default async function DashboardTodosList({
  displayMode,
  selectedStates,
}: {
  displayMode: "list" | "kanban";
  selectedStates: Selection;
}) {
  const data = await loadTodos(selectedStates);

  if (displayMode === "kanban") {
    return (
      <div className="pt-8">
        <TodosKanban groups={data} />
      </div>
    );
  }

  return <GroupedTodoList groups={data} />;
}
