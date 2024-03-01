import { Suspense } from "react";
import DashboardHeader from "@/components/ui/dashboard-header";
import DashboardSprintsList from "@/components/dahboard-sprints-list";

export default async function SprintsPage() {
  return (
    <>
      <div className="text-text">
        <DashboardHeader>
          <button className="px-2 py-1 text-sm border border-hover/20 hover:bg-hover bg-sheet rounded-lg">
            Nezačaté
          </button>
          <button className="px-2 py-1 text-sm border border-hover/20 hover:bg-hover bg-sheet rounded-lg">
            Aktivní
          </button>
          <button className="px-2 py-1 text-sm border border-hover/20 hover:bg-hover bg-sheet rounded-lg">
            Dokončené
          </button>
          <button className="px-2 py-1 text-sm border border-hover/20 hover:bg-primary bg-primary text-white rounded-lg">
            Všechny
          </button>
        </DashboardHeader>
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardSprintsList />
        </Suspense>
      </div>
    </>
  );
}
