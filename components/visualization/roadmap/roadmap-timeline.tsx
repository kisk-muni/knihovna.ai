import classNames from "classnames";
import { format, isThisYear, differenceInDays } from "date-fns";
import { cs } from "date-fns/locale";
import Link from "next/link";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import getRoadmapData from "./get-roadmap-data";

function FloatingButton(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <button className="flex-shrink-0 inline-flex items-center font-medium focus:outline-none focus:ring-none text-base text-text/70 hover:text-text/90 bg-white px-4 py-2 rounded-full border shadow-md ring-1 ring-text/10 hover:bg-sheet">
      {children}
    </button>
  );
}

export default async function RoadmapTimeline({
  detailed = false,
}: {
  detailed?: boolean;
}) {
  const data = await getRoadmapData();

  const now = new Date();
  const percentage =
    ((now.getTime() - data.range.start.getTime()) /
      (data.range.end.getTime() - data.range.start.getTime())) *
    100;

  const totalNumberOfDays = differenceInDays(data.range.end, data.range.start);

  const calendarItems = data.themes.slice(0, -1);

  return (
    <div className="relative">
      <div className="overflow-x-scroll">
        <div className="min-w-[1230px]">
          <div
            className="flex px-6 pb-1 "
            style={{
              gridTemplateColumns: `auto auto`,
            }}
          >
            {calendarItems.map((item, i) => {
              const daysIntheme = differenceInDays(
                item.dates.end,
                item.dates.start
              );
              const percentageOfTheme = (daysIntheme / totalNumberOfDays) * 100;
              return (
                <div
                  key={i}
                  className="mr-2"
                  style={{
                    width: `calc(${percentageOfTheme}% - 8px)`,
                  }}
                >
                  <div className="text-sm flex justify-between text-text/80">
                    <span>
                      {format(
                        item.dates.start,
                        `d. LLL${isThisYear(item.dates.start) ? "" : " yyyy"}`,
                        { locale: cs }
                      )}
                    </span>
                    {calendarItems.length - 1 === i && (
                      <span>
                        {format(
                          item.dates.start,
                          `d. LLL${
                            isThisYear(item.dates.start) ? "" : " yyyy"
                          }`,
                          { locale: cs }
                        )}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative w-full bg-sheet pt-6 pb-12 px-6">
            <div className={classNames("flex flex-wrap")} style={{}}>
              {data.themes.map((item, i) => {
                const daysIntheme = differenceInDays(
                  item.dates.end,
                  item.dates.start
                );
                const percentageOfTheme =
                  (daysIntheme / totalNumberOfDays) * 100;
                return (
                  <div
                    key={item.id}
                    className={classNames(
                      "bg-white hover:bg-white/70 hover:cursor-pointer rounded-md p-3 mr-2 mb-2 last:mb-0"
                    )}
                    style={{
                      width: `calc(${percentageOfTheme}% - 8px)`,
                    }}
                  >
                    <div className="flex gap-1 mb-2 text-text/80">
                      <div className="text-sm">
                        {i !== data.themes.length - 1
                          ? `Fáze ${i + 1}`
                          : "Průběžná fáze"}
                      </div>
                    </div>
                    <div className="text-text text-base mb-1 leading-tight flex justify-between">
                      {item.name}
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className="absolute z-20 -top-0 -bottom-0 w-[8px] left-[50%] -ml-[4px]"
              style={{
                left: `${percentage}%`,
              }}
            >
              <div className="absolute left-0 -top-[4px] w-[8px] h-[8px] bg-red-600 rounded-full"></div>
              <div className="absolute top-0 bottom-0 w-[2px] bg-red-600 left-[3px]"></div>
            </div>
          </div>
        </div>
      </div>
      {false && (
        <Link
          href={"/roadmap"}
          className="absolute z-30 bottom-8 left-[50%] -ml-[75px]"
        >
          <FloatingButton>
            <ArrowsPointingOutIcon className="h-5 w-5 text-current -ml-0.5 -mt-0.5 mr-1" />
            Detailní plán
          </FloatingButton>
        </Link>
      )}
    </div>
  );
}
