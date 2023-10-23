/* eslint-disable @next/next/no-img-element */
import Headline from "@/components/headline";
import FormatedDate from "@/components/formated-date";
import classNames from "classnames";
import { isWithinInterval } from "date-fns";
import { FireIcon } from "@heroicons/react/24/solid";
import { getSprints } from "@/lib/notion/get-sprints";
import Link from "next/link";
import Container from "@/components/container";
import { ScrollShadow } from "@nextui-org/react";

async function getSprintKanbans() {
  const sprints = (await getSprints())?.map((sprint) => {
    // sprint has todos property, which is an array of todo objects, each todo object has a Status property.
    // convert the todos array into a map of todos by status
    return {
      name: sprint.name,
      id: sprint.id,
      dates: sprint.dates,
      todos: sprint.todos.reduce((acc, todo) => {
        if (!acc[todo.status]) {
          acc[todo.status] = [];
        }
        acc[todo.status].push(todo);
        return acc;
      }, {} as Record<"Backlog" | "Not Started" | "In Progress" | "Review" | "Done", (typeof sprint.todos)[number][]>),
    };
  });
  return sprints;
}

export default async function SprintsPage() {
  const sprints = await getSprintKanbans();

  return (
    <main className="bg-white">
      <Container size="full" className="pt-10">
        <Headline as="h1" level="1" className="mb-8">
          Sprinty
        </Headline>
        <div className="flex gap-x-8 border-t border-gray-200">
          <aside
            className="h-screen flex-shrink-0 w-full md:w-52 pt-8 md:flex flex-col items-start fixed md:sticky top-[83px] z-10 hidden"
            style={{
              minHeight: "calc(100vh - 140px)",
            }}
          >
            <p className="uppercase mt-2 mb-4 text-sm font-medium text-text/80">
              Navigace
            </p>
          </aside>
          <div className="max-w-8xl pr-5 mx-auto">
            <section className="text-text mt-10">
              <div className="flex flex-col">
                {sprints?.map((sprint, i) => {
                  const active = isWithinInterval(new Date(), {
                    start: sprint.dates.start,
                    end: sprint.dates.end,
                  });
                  return (
                    <div key={i} className="bg-white relative overflow-hidden">
                      <div
                        className={classNames(
                          "flex sticky mb-4 rounded-md top-0 items-center py-3",
                          {
                            "bg-white": !active,
                            "bg-[#f5a623]": active,
                          }
                        )}
                      >
                        <div className="mr-2">
                          {active && (
                            <div className="rounded-full flex items-center bg-white text-[#f5a623] ml-2 px-2 py-0.5 inline-block text-sm">
                              Aktivní
                            </div>
                          )}
                        </div>
                        <div className="text-base font-bold mr-4">
                          {sprint.name.split(" (")[0]}
                        </div>
                        <div className="text-base">
                          <FormatedDate date={sprint.dates.start} /> -{" "}
                          <FormatedDate date={sprint.dates.end} />
                        </div>
                      </div>
                      <ScrollShadow
                        orientation="horizontal"
                        hideScrollBar
                        className="pb-16 max-w-full overflow-scroll"
                      >
                        <div className="grid grid-cols-5 gap-2 max-w-screen">
                          {Object.keys(sprint.todos).map((status, j) => {
                            const todos =
                              sprint.todos[status as keyof typeof sprint.todos];
                            return (
                              <div
                                key={status}
                                className="p-1 bg-sheet rounded-lg"
                              >
                                <div className="mb-1">
                                  <div
                                    className={classNames(
                                      "rounded-full text-white px-2 py-2 uppercase text-gray-500 font-medium inline-block text-sm"
                                    )}
                                  >
                                    {status}
                                  </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                  {todos.map((todo, k) => {
                                    return (
                                      <div
                                        key={k}
                                        className="px-3 py-2 rounded-lg bg-white border-b boder-gray-200"
                                      >
                                        <div className="gap-2">
                                          <div className="text-text font-medium text-base leading-tight">
                                            <Link href={todo.url || ""}>
                                              {todo.name}
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="">
                                          <div className="flex flex-wrap -ml-px mr-4 items-center">
                                            {todo?.authors.map((author, i) => (
                                              <div
                                                className="flex mb-0.5 -ml-1 mr-2 rounded-lg items-center py-1 px-1 hover:bg-sheet transition duration-150 ease-out"
                                                key={i}
                                              >
                                                <img
                                                  className="h-8 w-8 mr-1.5 rounded-full ring-1 ring-gray-100"
                                                  src={author.avatar}
                                                  alt=""
                                                />
                                                <div>
                                                  <div className="text-sm leading-tight text-text">
                                                    {author.name}
                                                  </div>
                                                  <div className="text-sm text-text/80 leading-none">
                                                    {author.description}
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </ScrollShadow>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
