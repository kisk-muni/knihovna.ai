import { type Selection } from "react-aria-components";

export function getFilterUrlParam(
  param: string[] | "all" | undefined,
  defaultValues: string[] = []
) {
  const states = (
    param
      ? Array.isArray(param)
        ? new Set(param || [])
        : new Set([param])
      : new Set(defaultValues)
  ) as Selection;
  return states;
}
