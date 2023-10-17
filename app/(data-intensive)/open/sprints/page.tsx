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
    <main className="bg-sheet">
      <Container size="full" className="pt-10">
        <Headline as="h1" level="1">
          Sprinty
        </Headline>
        <section className="text-text mt-10">
          <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden">
            {sprints?.map((sprint, i) => {
              const active = isWithinInterval(new Date(), {
                start: sprint.dates.start,
                end: sprint.dates.end,
              });
              return (
                <div
                  key={i}
                  className="bg-white relative overflow-hidden shadow-sm"
                >
                  <div
                    className={classNames(
                      "flex gap-4 sticky top-0 items-center px-4 py-3",
                      {
                        "bg-white": !active,
                        "bg-[#f5a623]": active,
                      }
                    )}
                  >
                    <div className="">
                      {active && (
                        <div className="rounded-full flex items-center bg-white text-[#f5a623] px-2 py-0.5 inline-block text-sm">
                          Aktivní
                        </div>
                      )}
                    </div>
                    <div className="text-base font-bold">
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
                    className="pb-16 max-w-full overflow-scroll bg-sheet"
                  >
                    <div className="grid grid-cols-5 gap-4 max-w-screen">
                      {Object.keys(sprint.todos).map((status, j) => {
                        const todos =
                          sprint.todos[status as keyof typeof sprint.todos];
                        return (
                          <div key={status} className="p-4">
                            <div className="mb-4">
                              <div
                                className={classNames(
                                  "rounded-full text-white px-2 py-0.5 inline-block text-sm",
                                  {
                                    "bg-[#50e3c2]": status === "Done",
                                    "bg-[#f5a623]": status === "In Progress",
                                    "bg-[#0070f3]": status === "Not Started",
                                    "bg-purple-300": status === "Backlog",
                                    "bg-yellow-300": status === "Review",
                                  }
                                )}
                              >
                                {status}
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              {todos.map((todo, k) => {
                                return (
                                  <div
                                    key={k}
                                    className="px-3 py-2 rounded-lg bg-white border-b boder-gray-200"
                                  >
                                    <div className="gap-2">
                                      <div className="text-base font-semibold">
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
      </Container>
    </main>
  );
}
