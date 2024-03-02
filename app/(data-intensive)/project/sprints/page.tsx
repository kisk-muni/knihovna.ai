import { Suspense } from "react";
import DashboardSprintsList from "@/components/dahboard-sprints-list";

export default async function SprintsPage() {
  return (
    <>
      <div className="text-text">
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardSprintsList />
        </Suspense>
      </div>
    </>
  );
}
