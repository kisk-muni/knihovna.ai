"use client";
import DashboardEpicView from "@/components/dashboard-epic-view";
import { getFilterUrlParam } from "@/lib/filters";
import { Suspense } from "react";

export default function SprintPage({
  params: { id },
  searchParams,
}: {
  params: { id: string };
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
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardEpicView
            selectedDisplayModes={display}
            id={id}
            selectedStates={states}
          />
        </Suspense>
      </div>
    </>
  );
}
