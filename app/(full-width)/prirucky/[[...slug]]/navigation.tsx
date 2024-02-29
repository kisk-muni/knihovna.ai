"use client";
import { Button } from "@/components/ui/button";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export const revalidate = 3600;

export const rootHref = "/prirucky";

export type NavItem = {
  name: string;
  href: string;
  items?: NavItem[];
};

const topNavIcons: { [key: string]: any } = {
  "/prirucky/ai": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="w-6 h-6 -mt-0.5 inline-block mr-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        stroke="#D68A67"
        style={{
          stroke: "color(display-p3 0.8392 0.5412 0.4039)",
          strokeOpacity: "1",
        }}
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    </svg>
  ),
};

export function SideNavigation({ items }: { items?: NavItem[] }) {
  const pathname = usePathname();
  const slug = pathname.split("/");
  const topLevelSlug = slug.slice(0, 3).join("/");
  const activeSection = items?.find((item) => item.href == topLevelSlug);
  if (pathname == rootHref)
    return (
      <div className="mt-14 mb-4">
        {activeSection && <SectionHeadline item={activeSection} />}
        <SubNavigation
          maxDepth={1}
          items={items?.filter((item) => item.href != rootHref)}
          renderItem={(item) => (
            <Fragment>
              {topNavIcons[item.href] && topNavIcons[item.href]} {item.name}
            </Fragment>
          )}
        />
      </div>
    );
  return (
    <Fragment>
      <Link href={rootHref}>
        <Button
          theme="primary"
          size="base"
          variant="ghost"
          className="-ml-8 ring-inset"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="inline-block mt-0.5 mr-1 w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>{" "}
          Příručky
        </Button>
      </Link>
      {activeSection && <SectionHeadline item={activeSection} />}
      <SubNavigation maxDepth={2} items={activeSection?.items} />
    </Fragment>
  );
}

export function SectionHeadline({ item }: { item: NavItem }) {
  return (
    <Fragment>
      <h1 className={"uppercase mt-3 mb-6 text-lg font-medium text-text"}>
        <Link href={item?.href || "/materialy"}>
          {item?.href && topNavIcons[item?.href]}
          {item?.name}
        </Link>
      </h1>
      <div className="h-px mb-6 w-full bg-[#C8C8C8]"></div>
    </Fragment>
  );
}

export function SubNavigation({
  maxDepth,
  depth = 1,
  items,
  renderItem,
}: {
  maxDepth: number;
  depth?: number;
  items?: NavItem[];
  renderItem?: (item: NavItem) => JSX.Element;
}) {
  const pathname = usePathname();
  return (
    <Fragment>
      <ul className="mb-6">
        {items?.map((item, i) => (
          <Fragment key={i}>
            <li className="mb-5" key={i}>
              <Link
                href={item.href}
                className={classNames(
                  "text-lg hover:text-primary font-medium",
                  {
                    "text-primary": pathname === item.href,
                    "text-text": pathname !== item.href,
                  }
                )}
              >
                {renderItem ? renderItem(item) : item.name}
              </Link>
            </li>
            {depth + 1 < maxDepth && item.items && (
              <li key={"c" + i} className="pl-4">
                <SubNavigation
                  maxDepth={maxDepth}
                  depth={depth + 1}
                  items={item.items}
                />
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </Fragment>
  );
}

export function Pagination({ items }: { items?: NavItem[] }) {
  let pathname = usePathname();
  const slug = pathname.split("/");
  const topLevelSlug = slug.slice(0, 3).join("/");
  const activesection = items?.find((item) => item.href == topLevelSlug);
  const aItems = activesection?.items;
  if (!aItems) return;
  // if (pathname === "/prirucka") pathname = "/prirucka/";
  const currentIndex = aItems.findIndex((item) => item.href === pathname);
  const prev = currentIndex > 0 ? aItems[currentIndex - 1] : null;
  const next =
    currentIndex <= aItems.length - 1 ? aItems[currentIndex + 1] : null;
  return (
    <div className="mt-8 mb-12 flex justify-between">
      {prev && prev?.href && (
        <div className="flex grow justify-start">
          <Link href={prev.href}>
            <Button theme="gray" size="base" variant="pagination" align="left">
              <div className="text-base font-normal text-text/70">
                Předchozí kapitola
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="inline-block mr-1 -mt-1 w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
                {prev.name}
              </div>
            </Button>
          </Link>
        </div>
      )}
      {next && next?.href && (
        <div className="flex grow justify-end">
          <Link href={next.href}>
            <Button theme="gray" size="base" variant="pagination" align="right">
              <div className="text-base font-normal text-text/70">
                Další kapitola
              </div>
              <div>
                {next.name}{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="inline-block ml-1 -mt-1 w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
