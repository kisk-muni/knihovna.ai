"use client";

import HorizontalFilter from "@/components/ui/horizontal-filter";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";
import { type Selection } from "react-aria-components";

export default function FilterState() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const defaultStates = (
    searchParams.get("state")
      ? new Set(searchParams.getAll("state"))
      : new Set()
  ) as Selection;

  const stateFilterItems = [
    { id: "not-started", label: "Nezačaté" },
    { id: "in-progress", label: "Probíhající" },
    { id: "review", label: "Čekající na schválení" },
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
        aria-label="Filtr stavů"
        onSelectionChange={(selection) => {
          handleFilterSearch("state", selection);
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
