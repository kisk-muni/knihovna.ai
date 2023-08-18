"use client";
import { Button } from "@/components/button";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export const rootHref = "/materialy";

export type NavItem = {
  name: string;
  href: string;
  items?: NavItem[];
};

const topNavIcons: { [key: string]: any } = {
  "/materialy": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="#D68A67"
      style={{
        stroke: "color(display-p3 0.8392 0.5412 0.4039)",
        strokeOpacity: "1",
      }}
      className="w-6 h-6 -mt-0.5 inline-block mr-2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
      />
    </svg>
  ),
  "/materialy/prirucka": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="w-6 h-6 -mt-0.5 inline-block mr-2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        stroke="#D68A67"
        style={{
          stroke: "color(display-p3 0.8392 0.5412 0.4039)",
          strokeOpacity: "1",
        }}
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    </svg>
  ),
  "/materialy/nastroje": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="#D68A67"
      style={{
        stroke: "color(display-p3 0.8392 0.5412 0.4039)",
        strokeOpacity: "1",
      }}
      className="w-6 h-6 -mt-0.5 inline-block mr-2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4.867 19.125h.008v.008h-.008v-.008z"
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
        <Button theme="primary" size="base" variant="ghost" className="-ml-8">
          ← Materiály
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
    <div className="mt-8 mb-12 flex justify-between -mx-6">
      {prev && prev?.href && (
        <div className="flex grow justify-start">
          <Link href={prev.href}>
            <Button theme="gray" size="base" variant="ghost">
              ← {prev.name}
            </Button>
          </Link>
        </div>
      )}
      {next && next?.href && (
        <div className="flex grow justify-end">
          <Link href={next.href}>
            <Button theme="gray" size="base" variant="ghost">
              {next.name} →
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
