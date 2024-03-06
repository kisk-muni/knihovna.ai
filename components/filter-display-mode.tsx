"use client";

import HorizontalFilter from "@/components/ui/horizontal-filter";
import { IconList } from "@/components/ui/icons";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";
import { type Selection } from "react-aria-components";

export default function FilterDisplayMode() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const paramName = "display";

  const defaultDisplay = (
    searchParams.get(paramName) !== null
      ? new Set(searchParams.getAll(paramName))
      : new Set(["kanban"])
  ) as Selection;

  const displayFilterItems = [
    {
      id: "list",
      label: "Seznam",
      icon: <IconList className="h-4 w-4 -mt-px" />,
    },
    {
      id: "kanban",
      label: "Kanban",
      icon: <IconList className="h-4 w-4 -mt-px rotate-90" />,
    },
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
        aria-label="Výběr zobrazení"
        onSelectionChange={(selection) => {
          handleFilterSearch(paramName, selection);
        }}
        selectionMode="single"
        orientation="horizontal"
        items={displayFilterItems}
        defaultSelectedKeys={defaultDisplay}
      />
    </Fragment>
  );
}
