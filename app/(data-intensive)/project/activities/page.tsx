import DashboardTodosList from "@/components/dashboard-todos-list";
import DashboardHeader from "@/components/ui/dashboard-header";
import { Suspense } from "react";
import Loading from "./loading";
import FilterState from "@/components/filter-state";
import FilterDisplayMode from "@/components/filter-display-mode";
import { getFilterUrlParam } from "@/lib/filters";

export default function TodosPage({
  searchParams,
}: {
  searchParams?: {
    display?: string[] | "all";
    state?: string[] | "all";
  };
}) {
  const states = getFilterUrlParam(searchParams?.state);
  const display = getFilterUrlParam(searchParams?.display, ["kanban"]);
  return (
    <>
      <div className="text-text">
        <DashboardHeader className="justify-between">
          <FilterState />
          <FilterDisplayMode />
        </DashboardHeader>
        <Suspense fallback={<Loading />}>
          <DashboardTodosList
            selectedStates={states}
            selectedDisplayModes={display}
          />
        </Suspense>
      </div>
    </>
  );
}
