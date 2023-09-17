import classNames from "classnames";
import { format, isThisYear, differenceInDays } from "date-fns";
import { cs } from "date-fns/locale";
import Link from "next/link";
import getRoadmapData from "./get-roadmap-data";
import { Fragment } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { defaultComponents } from "@/lib/mdx";

export default async function RoadmapPhases() {
  const data = await getRoadmapData();

  return (
    <Fragment>
      {data.themes.map((item, i) => {
        return (
          <div key={item.id} className={classNames("mb-6 md:mb-10 lg:mb-12")}>
            <div className="flex flex-wrap justify-start items-baseline gap-2">
              <span className="uppercase inline-block rounded-full bg-text/80 py-0.5 px-2 text-sm text-white">
                {i !== data.themes.length - 1
                  ? `Fáze ${i + 1}`
                  : "Průběžná fáze"}
              </span>
              <div className="text-xl text-text font-bold leading-tight">
                {item.name}
              </div>
              <span className="text-sm">
                {"("}
                {format(
                  item.dates.start,
                  `LLL d${isThisYear(item.dates.start) ? "" : ", yy"}`,
                  { locale: cs }
                )}{" "}
                -{" "}
                {format(
                  item.dates.end,
                  `LLL d${isThisYear(item.dates.end) ? "" : ", yy"}`,
                  { locale: cs }
                )}
                {")"}
              </span>
            </div>
            <div className="pl-1 mt-3 [&>p]:mt-0 [&>p]:mb-2 [&>ul]:mt-0 [&>ul]:mb-3 [&>ul>li]:mt-0 [&>ul>li]:mb-0.5 [&>ul>li]:leading-normal">
              <MDXRemote
                components={defaultComponents}
                source={item.markdownContents as unknown as {}}
              />
            </div>
          </div>
        );
      })}
    </Fragment>
  );
}
