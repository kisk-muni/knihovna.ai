import classNames from "classnames";
import notion from "@/lib/notion";
import siteConfig from "@/site-config";
import {
  parseISO,
  format,
  isThisYear,
  eachMonthOfInterval,
  differenceInDays,
} from "date-fns";
import { cs } from "date-fns/locale";
//import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";

function FloatingButton(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <button className="flex-shrink-0 inline-flex items-center font-medium focus:outline-none focus:ring-none text-base text-text/70 hover:text-text/90 bg-white px-4 py-2 rounded-full border shadow-md ring-1 ring-text/10 hover:bg-sheet">
      {children}
    </button>
  );
}

type RoadmapNotionItem = {
  id: string;
  url: string;
  public_url: string;
  properties: {
    Name: {
      title: {
        plain_text: string;
      }[];
    };
    Dates: {
      date: {
        start: string;
        end: string;
        time_zone: string | null;
      };
    };
  };
};

async function getData() {
  const database = (
    await notion.databases.query({
      database_id: siteConfig.notion.databases.roadmap,
    })
  ).results as unknown as RoadmapNotionItem[];
  const roadmapThemes = database
    .map((item) => {
      return {
        id: item.id,
        name: item.properties.Name.title[0].plain_text,
        dates: {
          start: parseISO(item.properties.Dates.date.start),
          end: parseISO(item.properties.Dates.date.end),
        },
      };
    })
    .sort((a, b) => {
      return a.dates.start.getTime() - b.dates.start.getTime();
    });
  const range = {
    start: roadmapThemes[0].dates.start,
    end: roadmapThemes[roadmapThemes.length - 1].dates.end,
  };
  // move the first item in roadmapThemes to the end
  roadmapThemes.push(roadmapThemes.shift() as any);
  return { themes: roadmapThemes, range };
}

export default async function Roadmap({}: {}) {
  const data = await getData();

  // using date-fns compoute perentage of the date range, given data.range.start and data.range.end
  const now = new Date();
  const percentage =
    ((now.getTime() - data.range.start.getTime()) /
      (data.range.end.getTime() - data.range.start.getTime())) *
    100;

  const months = eachMonthOfInterval(data.range);
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
                      {/*<span className="text-sm">
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
                    </span>*/}
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
      {/*!detailed && (
        <Link
          href={"/roadmap"}
          className="absolute z-30 bottom-8 left-[50%] -ml-[75px]"
        >
          <FloatingButton>
            <ArrowsPointingOutIcon className="h-5 w-5 text-current -ml-0.5 -mt-0.5 mr-1" />
            Detailní plán
          </FloatingButton>
        </Link>
      )*/}
    </div>
  );
}
