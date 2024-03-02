"use client";
import DashboardPlanList from "@/components/dashboard-plan-list";
import DashboardSprintView from "@/components/dashboard-sprint-view";
import DashboardTodosList from "@/components/dashboard-todos-list";
import DashboardHeader from "@/components/ui/dashboard-header";
import HorizontalFilter from "@/components/ui/horizontal-filter";
import { Suspense, useState } from "react";
import { type Selection } from "react-aria-components";

export default function SprintPage({
  params: { id },
}: {
  params: { id: string };
}) {
  let [selectedStateFilter, setSelectedStateFilter] = useState<Selection>(
    new Set(["all"])
  );
  let [selectedDisplayMode, setSelectedDisplayMode] = useState<Selection>(
    new Set(["kanban"])
  );
  const stateFilterItems = [
    { id: "not-started", label: "Nezačaté" },
    { id: "active", label: "Aktivní" },
    { id: "done", label: "Dokončené" },
    { id: "all", label: "Všechny" },
  ];
  const displayFilterItems = [
    { id: "list", label: "Seznam" },
    { id: "kanban", label: "Kanban" },
  ];
  const displayMode =
    selectedDisplayMode === "all"
      ? "kanban"
      : selectedDisplayMode.entries().next().value[0];
  return (
    <>
      <div className="text-text">
        <DashboardHeader className="justify-end">
          {/*   <HorizontalFilter
            aria-label="Filtr stavu"
            selectedKeys={selectedStateFilter}
            onSelectionChange={setSelectedStateFilter}
            selectionBehavior="replace"
            selectionMode="multiple"
            items={stateFilterItems}
          /> */}
          <HorizontalFilter
            aria-label="Filtr stavu"
            selectedKeys={selectedDisplayMode}
            onSelectionChange={setSelectedDisplayMode}
            selectionMode="single"
            items={displayFilterItems}
          />
        </DashboardHeader>
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardSprintView id={id} displayMode={displayMode} />
        </Suspense>
      </div>
    </>
  );
}
