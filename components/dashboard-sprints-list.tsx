import { getSprints } from "@/app/actions";
import { formattedDate } from "@/lib/date";
import classNames from "classnames";
import { cache } from "react";
import Link from "next/link";
import { SprintIcon } from "./ui/sprint-icon";

const loadSprints = cache(async () => {
  return await getSprints();
});

export default async function DashboardSprintsList() {
  const data = await loadSprints();

  return (
    <div className="pt-8">
      {data.map((sprint, t) => {
        const { isActive, isPast, scope, activeRate, successRate } = sprint;

        return (
          <div key={t} className="flex">
            <Link
              href={`/project/sprints/${sprint.id}`}
              className="flex grow transition duration-150 ease-out hover:bg-neutral-50"
            >
              {" "}
              <div className="mr-6 pl-6 pr-3 w-[100px] flex justify-end text-right">
                <div className="text-neutral-600 mr-4">
                  <span className="text-xs relative -top-3.5 leading-3 text-">
                    {sprint.dateEnd && formattedDate(sprint.dateEnd)}
                  </span>
                </div>
                <div className={classNames("relative h-full")}>
                  <div
                    className={classNames(
                      "border-r-[1.5px] border-solid w-[1.5px] absolute -right-[0.75px] bottom-[6px] top-[4px]",
                      {
                        "border-neutral-200": !isPast,
                        "border-primary": isPast || isActive,
                      }
                    )}
                  ></div>
                  <div
                    className={classNames(
                      "absolute w-2.5 h-2.5 border-[1.5px] border-solid -right-[5.25px] -top-[5.25px] rounded-full z-20",
                      {
                        "border-transparent bg-primary": isPast && !isActive,
                        "border-neutral-200 bg-transparent":
                          !isPast && !isActive,
                        "border-primary bg-transparent": isActive,
                      }
                    )}
                  ></div>
                </div>
              </div>
              <div className="border-b border-neutral-200 grow flex items-center pl-2 pr-8 py-8">
                <div className="flex grow items-center">
                  <SprintIcon
                    isActive={sprint.isActive}
                    isPast={isPast}
                    className="w-5 h-5 mr-2"
                  />
                  <h2 className="font-medium text-text-900 text-sm">
                    {sprint.name}
                  </h2>
                </div>
                {!isActive && (
                  <span className="bg-sheet py-0.5 px-1.5 mr-6 rounded-md text-text/80 text-sm font-medium">
                    {isPast ? "Uplynulý" : "Nadcházející"}
                  </span>
                )}
                <div className="flex space-x-6 text-sm">
                  {!!scope && !["NaN", "0"].includes(activeRate?.toFixed()) && (
                    <div className="text-yellow-600">
                      {activeRate.toFixed()} % aktivních
                    </div>
                  )}
                  {!!scope && successRate && (
                    <div className="text-emerald-600">
                      {successRate.toFixed()} % hotových
                    </div>
                  )}
                  <div className="text-text/80">{scope} celkem</div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
