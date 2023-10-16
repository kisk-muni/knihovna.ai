import { TocItem } from "@/lib/notion/schema";
import classNames from "classnames";
import Link from "next/link";
import { Fragment } from "react";

export default function TocNavigation({
  maxDepth,
  depth = 1,
  items,
}: {
  maxDepth: number;
  depth?: number;
  items?: TocItem[];
}) {
  return (
    <Fragment>
      <ul className="mb-4">
        {items?.map((item, i) => (
          <Fragment key={i}>
            <li className="mb-2" key={i}>
              <Link
                href={item.href}
                className={classNames(
                  "text-base hover:text-primary text-text font-semibold"
                )}
              >
                {item.text}
              </Link>
            </li>
            {depth + 1 < maxDepth && item.children && (
              <li key={"c" + i} className="pl-2">
                <TocNavigation
                  maxDepth={maxDepth}
                  depth={depth + 1}
                  items={item.children}
                />
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </Fragment>
  );
}
