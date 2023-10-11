"use client";
import { Button } from "@/components/button";
import Card from "@/components/card";
import FormatedDate from "@/components/formated-date";
import Headline from "@/components/headline";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type } from "os";
import { Fragment } from "react";

export const revalidate = 3600;

export const rootHref = "/materialy";

export type MaterialNavItem = {
  publishedAt?: Date;
  description?: string;
  type?: string;
  name: string;
  href: string;
  items?: MaterialNavItem[];
};

const topNavIcons: { [key: string]: any } = {
  "/materialy": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#D68A67"
      style={{
        stroke: "color(display-p3 0.8392 0.5412 0.4039)",
        strokeOpacity: "1",
      }}
      className="w-6 h-6 -mt-0.5 inline-block mr-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
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
  Workshop: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#D68A67"
      style={{
        stroke: "color(display-p3 0.8392 0.5412 0.4039)",
        strokeOpacity: "1",
      }}
      className="w-6 h-6 -mt-0.5 inline-block mr-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.867 19.125h.008v.008h-.008v-.008z"
      />
    </svg>
  ),
  Research: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      style={{
        stroke: "color(display-p3 0.8392 0.5412 0.4039)",
        strokeOpacity: "1",
      }}
      className="w-6 h-6 -mt-0.5 inline-block mr-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    </svg>
  ),
};

const typeName = {
  Workshop: "Workshopy",
  Research: "Výzkum",
  Other: "Ostatní",
};

export function Navigation({ items }: { items?: MaterialNavItem[] }) {
  const pathname = usePathname();
  const slug = pathname.split("/");
  // const topLevelSlug = slug.slice(0, 3).join("/");
  // render cards and list items in them, each card represents a group by item.type

  //const activeSection = items?.find((item) => item.href == topLevelSlug);
  return (
    <div className="mt-6 mb-4 grid gap-4 grid-cols-1">
      {items?.map((item, i) => {
        return (
          <Link key={i} href={item.href}>
            <Card
              size="md"
              className="bg-white hover:bg-sheet flex flex-col justify-start shadow-sm"
            >
              <div className="uppercase mb-6 text-lg font-medium text-text">
                {topNavIcons[item.type as string] &&
                  topNavIcons[item.type as string]}{" "}
                {typeName[item.type as keyof typeof typeName]}
              </div>
              <Headline as="h3" level="2" className="mb-0 font-bold">
                {item?.name && item.name}
              </Headline>
              {item?.publishedAt && (
                <div className="text-lg text-text/70">
                  <FormatedDate date={item.publishedAt} relative />
                </div>
              )}
            </Card>
          </Link>
        );
      })}
    </div>
  );
  /* return (
    <Fragment>
      <Link href={rootHref}>
        <Button theme="primary" size="base" variant="ghost" className="-ml-8">
          ← Materiály
        </Button>
      </Link>
      {activeSection && <SectionHeadline item={activeSection} />}
      <SubNavigation maxDepth={2} items={activeSection?.items} />
    </Fragment>
  ); */
}

export function SectionHeadline({ item }: { item: MaterialNavItem }) {
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
  items?: MaterialNavItem[];
  renderItem?: (item: MaterialNavItem) => JSX.Element;
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

export function Pagination({ items }: { items?: MaterialNavItem[] }) {
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
