"use client";
import DashboardPlanList from "@/components/dashboard-plan-list";
import DashboardHeader from "@/components/ui/dashboard-header";
import HorizontalFilter from "@/components/ui/horizontal-filter";
import { Suspense, useState } from "react";
import { type Selection } from "react-aria-components";

export default function PlanPage() {
  let [selectedStateFilter, setSelectedStateFilter] = useState<Selection>(
    new Set(["all"])
  );
  let [selectedDisplayFilter, setSelectedDisplayFilter] = useState<Selection>(
    new Set(["list"])
  );
  const stateFilterItems = [
    { id: "not-started", label: "Nezačaté" },
    { id: "active", label: "Aktivní" },
    { id: "done", label: "Dokončené" },
    { id: "all", label: "Všechny" },
  ];
  const displayFilterItems = [
    { id: "list", label: "Seznam" },
    { id: "timeline", label: "Časová osa" },
  ];
  return (
    <>
      <div className="text-text">
        <DashboardHeader className="justify-between">
          <HorizontalFilter
            aria-label="Filtr stavu"
            selectedKeys={selectedStateFilter}
            onSelectionChange={setSelectedStateFilter}
            selectionBehavior="replace"
            selectionMode="multiple"
            items={stateFilterItems}
          />
          <HorizontalFilter
            aria-label="Filtr stavu"
            selectedKeys={selectedDisplayFilter}
            onSelectionChange={setSelectedDisplayFilter}
            selectionMode="single"
            items={displayFilterItems}
          />
        </DashboardHeader>
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardPlanList
            displayFilter={selectedDisplayFilter}
            stateFilter={selectedStateFilter}
          />
        </Suspense>
      </div>
    </>
  );
}
