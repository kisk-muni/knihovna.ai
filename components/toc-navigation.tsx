"use client";

import { TocItem } from "@/lib/notion/schema";
import classNames from "classnames";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export function useActiveId(ids: string[]) {
  const [activeIdIndex, setActiveIdIndex] = useState(0);

  const handleScroll = () => {
    const activeIndex = ids.findIndex((id) => {
      const el = document.getElementById(id);
      if (!el) return false;
      const { top } = el.getBoundingClientRect();
      return top > 0 && top < window.innerHeight / 2;
    });
    if (activeIndex > -1) {
      setActiveIdIndex(activeIndex);
    }
  };

  const debounced = useDebouncedCallback(handleScroll, 100);

  useEffect(() => {
    window.addEventListener("scroll", debounced);
    return () => window.removeEventListener("scroll", debounced);
  }, [debounced]);

  return { activeId: ids[activeIdIndex] };
}

export function Navigation({
  maxDepth,
  depth = 1,
  activeId,
  toc,
}: {
  maxDepth: number;
  depth?: number;
  activeId?: string;
  toc?: TocItem[];
}) {
  return (
    <Fragment>
      <ul className="mb-4">
        {toc?.map((item, i) => (
          <Fragment key={i}>
            <li className="mb-2" key={i}>
              <Link
                href={"#" + item.id}
                className={classNames(
                  "text-sm block hover:text-primary px-3 py-1 rounded-xl font-semibold",
                  {
                    "text-text bg-[#FCF2E8]": activeId === item.id,
                    "text-text/80 bg-transparent": activeId !== item.id,
                  }
                )}
              >
                {item.text}
              </Link>
            </li>
            {depth + 1 < maxDepth && item.children && (
              <li key={"c" + i} className="pl-2">
                <Navigation
                  activeId={activeId}
                  maxDepth={maxDepth}
                  depth={depth + 1}
                  toc={item.children}
                />
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </Fragment>
  );
}

export default function TocNavigation({
  maxDepth,
  toc,
  ids,
}: {
  maxDepth: number;
  toc: TocItem[];
  ids: string[];
}) {
  const { activeId } = useActiveId(ids);
  return (
    <nav className="-ml-3">
      <Navigation activeId={activeId} maxDepth={maxDepth} toc={toc} />
    </nav>
  );
}
