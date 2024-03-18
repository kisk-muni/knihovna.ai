import DashboardPlanList from "@/components/dashboard-plan-list";
import FilterPhaseState from "@/components/filter-phase-state";
import DashboardHeader from "@/components/ui/dashboard-header";
import { getFilterUrlParam } from "@/lib/filters";
import { Suspense } from "react";

export default function PlanPage({
  searchParams,
}: {
  searchParams?: {
    display?: string[] | "all";
    "phase-state"?: string[] | "all";
  };
}) {
  const selectedPhaseState = getFilterUrlParam(searchParams?.["phase-state"]);
  return (
    <>
      <div className="text-text">
        <DashboardHeader className="justify-between">
          <FilterPhaseState />
        </DashboardHeader>
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardPlanList stateFilter={selectedPhaseState} />
        </Suspense>
      </div>
    </>
  );
}
