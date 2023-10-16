/* eslint-disable @next/next/no-img-element */
import Headline from "@/components/headline";
import getData from "@/lib/notion/get-data";
import siteConfig from "@/site-config";
import { SprintSchema, TodoSchema } from "@/lib/notion/schema";
import FormatedDate from "@/components/formated-date";
import { mapAuthors } from "@/lib/notion/map-authors";
import classNames from "classnames";
import { isWithinInterval } from "date-fns";
import { FireIcon } from "@heroicons/react/24/solid";
// import Roadmap from "@/components/visualization/roadmap/roadmap-timeline";
export default async function RoadmapPage() {
  const data = await getData<SprintSchema>(
    siteConfig.notion.databases.sprints,
    {
      withRelations: false,
    }
  );
  const sprintsWithRelation = data
    .map((item) => {
      const { Name, Dates, "To-dos": ToDos } = item.properties;
      return {
        id: item.id,
        name: Name?.title[0]?.plain_text,
        dates: {
          start: new Date(Dates?.date?.start),
          end: new Date(Dates?.date?.end),
        },
        todos: ToDos.relation,
        // filter out private todos
        /*             ?.filter((todoItem) => todoItem.properties.Private.checkbox != true)
            .map((todoItem) => {
              const { Name, Status, Category, Dates, Assignee } =
                todoItem.properties;
              return {
                id: todoItem.id,
                name: Name.title[0].plain_text,
                dates: Dates.date,
                status: Status?.status.name,
                category: Category?.multi_select,
                assignees: Assignee?.people,
                markdown: item.markdownContents,
                toc: item.toc,
              };
            }) || [], */
      };
    })
    .filter((sprint) => sprint.name !== "Default sprint")
    .sort((a, b) => b.dates.start.getTime() - a.dates.start.getTime());

  const todos = await getData<TodoSchema>(siteConfig.notion.databases.todos);
  const publicTodos = todos
    .filter((item) => item.properties.Private.checkbox != true)
    .map((item) => {
      const { Name, Status, Category, Dates, Assignee, Sprint } =
        item.properties;
      return {
        id: item.id,
        name: Name?.title[0]?.plain_text,
        status: Status?.status.name,
        category: Category?.multi_select,
        dates: Dates?.date,
        authors: mapAuthors(Assignee),
        markdown: item.markdownContents,
        toc: item.toc,
        sprints:
          Sprint?.items?.map((item) => {
            name: item.properties.Name.title[0].plain_text;
            dates: item.properties.Dates.date;
          }) || [],
      };
    });

  const sprints = sprintsWithRelation.map((sprint) => {
    return {
      ...sprint,
      todos: publicTodos.filter((todo) =>
        sprint.todos.find((item) => item.id === todo.id)
      ),
    };
  });

  // console.log(JSON.stringify(data[20].properties, null, 2));
  return (
    <main className="mt-12 mb-12">
      <Headline as="h1" level="1">
        Roadmap
      </Headline>
      <section className="text-text">
        <div className="flex flex-col gap-8">
          {sprints?.map((sprint, i) => {
            const active = isWithinInterval(new Date(), {
              start: sprint.dates.start,
              end: sprint.dates.end,
            });
            return (
              <div
                key={i}
                className="bg-white relative rounded-xl border border-gray-200 overflow-hidden shadow-sm"
              >
                <div
                  className={classNames(
                    "flex gap-4 sticky top-0 items-center px-4 py-3",
                    {
                      "bg-sheet": !active,
                      "bg-orange-300": active,
                    }
                  )}
                >
                  <div className="">
                    {active && (
                      <div className="rounded-full flex items-center bg-white text-orange-500 px-2 py-0.5 inline-block text-sm">
                        <FireIcon className="h-5 w-5 text-orange-500" /> Aktivní
                      </div>
                    )}
                  </div>
                  <div className="text-lg font-bold">
                    {sprint.name.split(" (")[0]}
                  </div>
                  <div className="text-lg">
                    <FormatedDate date={sprint.dates.start} /> -{" "}
                    <FormatedDate date={sprint.dates.end} />
                  </div>
                </div>
                {sprint.todos.map((todo, k) => {
                  return (
                    <div key={k} className="px-4 py-3 border-t boder-gray-200">
                      <div className="gap-2">
                        <div
                          className={classNames(
                            "rounded-full text-white px-2 py-0.5 inline-block text-sm",
                            {
                              "bg-green-500": todo.status === "Done",
                              "bg-orange-500": todo.status === "In Progress",
                              "bg-red-500": todo.status === "Not Started",
                              "bg-purple-500": todo.status === "Backlog",
                              "bg-yellow-500": todo.status === "Review",
                            }
                          )}
                        >
                          {todo.status}
                        </div>
                        <div className="text-lg font-semibold">{todo.name}</div>
                      </div>
                      <div className="mt-2">
                        <div className="flex flex-wrap -ml-px mr-4 items-center">
                          {todo?.authors.map((author, i) => (
                            <div
                              className="flex -ml-2 mr-4 mb-1 rounded-lg items-center py-1.5 px-2 hover:bg-sheet transition duration-150 ease-out"
                              key={i}
                            >
                              <img
                                className="h-10 w-10 mr-1.5 rounded-full ring-1 ring-gray-100"
                                src={author.avatar}
                                alt=""
                              />
                              <div>
                                <div className="text-base leading-tight text-text">
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
            );
          })}
        </div>
      </section>
    </main>
  );
}
