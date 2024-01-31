"use client";
import Card from "@/components/card";
import FormatedDate from "@/components/formated-date";
import Headline from "@/components/headline";
import { MultiState } from "@/lib/notion/schema";
import classNames from "classnames";
import Link from "next/link";

export const revalidate = 3600;

export const rootHref = "/materialy";

export type MaterialNavItem = {
  publishedAt?: Date;
  description?: string;
  type?: string;
  state?: string[];
  name: string;
  href: string;
  items?: MaterialNavItem[];
};

const topNavIcons: { [key: string]: any } = {
  Workshop: (
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
        d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
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
  Collection: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      style={{
        stroke: "color(display-p3 0.8392 0.5412 0.4039)",
        strokeOpacity: "1",
      }}
      className="w-6 h-6 -mt-0.5 inline-block mr-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
      />
    </svg>
  ),
  "Prototype Docs": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      style={{
        stroke: "color(display-p3 0.8392 0.5412 0.4039)",
        strokeOpacity: "1",
      }}
      className="w-6 h-6 -mt-0.5 inline-block mr-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  ),
  "Ideation Docs": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      style={{
        stroke: "color(display-p3 0.8392 0.5412 0.4039)",
        strokeOpacity: "1",
      }}
      className="w-6 h-6 -mt-0.5 inline-block mr-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
      />
    </svg>
  ),
  "Testing Docs": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      style={{
        stroke: "color(display-p3 0.8392 0.5412 0.4039)",
        strokeOpacity: "1",
      }}
      className="w-6 h-6 -mt-0.5 inline-block mr-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
      />
    </svg>
  ),
};

const typeName = {
  Workshop: "Workshop",
  Research: "Výzkum",
  Collection: "Kolekce",
  "Prototype Docs": "Prototyp",
  "Ideation Docs": "Ideace",
  Other: "Ostatní",
};

export function List({ items }: { items?: MaterialNavItem[] }) {
  const featuredCount = 3;
  return (
    <div className="mt-6 mb-4 grid gap-4 grid-cols-1 md:grid-cols-[1fr,1fr,1fr] md:grid-rows-[repeat(2,1fr)]">
      {items?.map((item, i) => {
        return (
          <Link
            key={i}
            href={item.href}
            className={classNames("flex shrink", {
              "md:row-span-2 md:col-span-1": i === 0,
              "md:row-span-1 md:col-span-2": [1, 2].includes(i),
              "md:row-span-1 md:col-span-3": i >= featuredCount,
            })}
          >
            <Card
              size="md"
              className={classNames(
                "grow bg-white hover:bg-sheet flex flex-col justify-between",
                {
                  "shadow-sm": i < featuredCount,
                  "shadow-none": i >= featuredCount,
                }
              )}
            >
              <div className="uppercase mb-4 text-base flex items-center font-medium text-text">
                {topNavIcons[item.type as string] &&
                  topNavIcons[item.type as string]}{" "}
                {typeName[item.type as keyof typeof typeName]}{" "}
                {item.state && item.state.includes("Draft") && (
                  <span className="text-text text-sm normal-case bg-blue-100 py-1 flex items-center px-3 ml-2 rounded-full">
                    <span className="h-2 w-2 inline-block rounded-full bg-blue-600 mr-1.5">
                      {" "}
                    </span>
                    <span className="inline-block text-blue-600 tracking-tight">
                      {"Rozpracované"}
                    </span>
                  </span>
                )}
              </div>
              <div>
                <Headline
                  as="h3"
                  level={i === 0 ? "2" : "4"}
                  className="mb-0 font-bold"
                >
                  {item?.name && item.name}
                </Headline>
                {item?.publishedAt && (
                  <div className="text-lg text-text/70">
                    <FormatedDate date={item.publishedAt} relative />
                  </div>
                )}
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
