"use client";

import HorizontalFilter from "@/components/ui/horizontal-filter";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";
import { type Selection } from "react-aria-components";

export default function FilterPhaseState() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const paramName = "phase-state";

  const defaultStates = (
    searchParams.get(paramName)
      ? new Set(searchParams.getAll(paramName))
      : new Set()
  ) as Selection;

  const stateFilterItems = [
    { id: "not-started", label: "Neaktivní" },
    { id: "active", label: "Aktivní" },
    { id: "done", label: "Dokončené" },
  ];

  function handleFilterSearch(param: string, selection: Selection) {
    const params = new URLSearchParams(searchParams);
    params.delete(param);
    if (selection != "all") {
      for (const item of selection) {
        params.append(param, `${item}`);
      }
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <Fragment>
      <HorizontalFilter
        aria-label="Filtr stavu"
        onSelectionChange={(selection) => {
          handleFilterSearch(paramName, selection);
        }}
        orientation="horizontal"
        selectionMode="multiple"
        disallowEmptySelection={false}
        items={stateFilterItems}
        defaultSelectedKeys={defaultStates}
      />
    </Fragment>
  );
}
