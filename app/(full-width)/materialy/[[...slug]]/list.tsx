"use client";
import Card from "@/components/card";
import FormatedDate from "@/components/formated-date";
import Headline from "@/components/headline";
import classNames from "classnames";
import Link from "next/link";

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
      stroke="currentColor"
      strokeWidth={2}
      style={{
        stroke: "color(display-p3 0.8392 0.5412 0.4039)",
        strokeOpacity: "1",
      }}
      className="w-6 h-6 -mt-0.5 inline-block mr-2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  ),
};

const typeName = {
  Workshop: "Workshop",
  Research: "Výzkum",
  Collection: "Kolekce",
  Other: "Ostatní",
};

export function List({ items }: { items?: MaterialNavItem[] }) {
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
              "md:row-span-1 md:col-span-3": i >= 3,
            })}
          >
            <Card
              size="md"
              className="grow bg-white hover:bg-sheet flex flex-col justify-between shadow-sm"
            >
              <div className="uppercase mb-4 text-base flex items-center font-medium text-text">
                {topNavIcons[item.type as string] &&
                  topNavIcons[item.type as string]}{" "}
                {typeName[item.type as keyof typeof typeName]}
              </div>
              <div>
                <Headline
                  as="h3"
                  level={i === 0 ? "2" : "3"}
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
