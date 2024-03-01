"use client";
import DashboardEpicView from "@/components/dashboard-epic-view";
import DashboardHeader from "@/components/ui/dashboard-header";
import HorizontalFilter from "@/components/ui/horizontal-filter";
import { Suspense, useState } from "react";
import { type Selection } from "react-aria-components";

export default function SprintPage({
  params: { id },
}: {
  params: { id: string };
}) {
  let [selectedDisplayFilter, setSelectedDisplayFilter] = useState<Selection>(
    new Set(["kanban"])
  );

  const displayFilterItems = [
    { id: "list", label: "Seznam" },
    { id: "kanban", label: "Kanban" },
  ];
  return (
    <>
      <div className="text-text">
        <DashboardHeader className="justify-end">
          <HorizontalFilter
            aria-label="Filtr stavu"
            selectedKeys={selectedDisplayFilter}
            onSelectionChange={setSelectedDisplayFilter}
            selectionMode="single"
            items={displayFilterItems}
          />
        </DashboardHeader>
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardEpicView id={id} />
        </Suspense>
      </div>
    </>
  );
}
