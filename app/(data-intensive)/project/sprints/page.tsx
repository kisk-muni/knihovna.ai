import { Suspense } from "react";
import DashboardSprintsList from "@/components/dashboard-sprints-list";

export const dynamic = "force-dynamic";

export default async function SprintsPage() {
  return (
    <>
      <div className="bg-white">
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardSprintsList />
        </Suspense>
      </div>
    </>
  );
}
