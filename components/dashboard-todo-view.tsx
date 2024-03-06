import { getTodo } from "@/app/actions";
import { Suspense, cache } from "react";
import UserList from "./ui/user-list";
import { StateLabel } from "./ui/state-label";
import DashboardSidepanelLayout, {
  SidePanelLabel,
} from "./dashboard-sidepanel-layout";
import { CategoriesList } from "./ui/categories-list";
import { EpicsList } from "./ui/epics-list";
import { Link } from "react-aria-components";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import MDXContent from "./mdx-content";

const loadTodo = cache(async (id: string) => {
  return await getTodo(id);
});

export default async function DashboardTodoView({ id }: { id: string }) {
  const data = await loadTodo(id);
  if (!data) return null;
  const mdxOptions = {
    development: process.env.NODE_ENV === "development",
    remarkPlugins: [remarkGfm],
  };
  const mdx = await serialize(data.content || "", { mdxOptions });

  return (
    <DashboardSidepanelLayout
      contentClassName="bg-white text-text"
      content={
        <div className="max-w-screen-lg px-6 py-8 mx-auto">
          <div className="mb-1.5 border-b border-neutral-200 pb-3">
            <h2 className="font-medium text-text-950 mb-1 text-2xl">
              {data?.name}
            </h2>
            <div className="flex items-center">
              <StateLabel
                icon="todo"
                state={{ standardised: data.state?.standardised || "" }}
                className="py-1 px-2.5 mr-2"
              />
            </div>
          </div>
          <div className="prose prose-headings:font-medium prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline prose-text prose-headings:leading-tight prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-md prose-h5:text-base">
            <MDXContent mdx={mdx} />
          </div>
        </div>
      }
      sidebarClassName="bg-neutral-50"
      sidebar={
        <div>
          <div className="p-2 space-y-6">
            <div>
              <SidePanelLabel>Stav</SidePanelLabel>
              <StateLabel
                icon="todo"
                state={{ standardised: data.state?.standardised || "" }}
                className="py-1 px-2.5 mr-2"
              />
            </div>
            {data.users.length > 0 && (
              <div>
                <SidePanelLabel>Řešitelé</SidePanelLabel>
                <UserList users={data.users} />
              </div>
            )}
            {data.sprints.length > 0 && (
              <div>
                <SidePanelLabel>Sprinty</SidePanelLabel>
                <div className="space-x-2">
                  {data.sprints.map(({ sprint }, s) => (
                    <Link
                      key={s}
                      href={`/project/sprints/${sprint.id}`}
                      className="text-text p-1 bg-neutral-100 hover:bg-neutral-200 rounded-md text-[13px]"
                    >
                      {sprint.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {data.epics.length > 0 && (
              <div>
                <SidePanelLabel>Cíle</SidePanelLabel>
                <EpicsList epics={data.epics} />
              </div>
            )}
            {data.categories.length > 0 && (
              <div>
                <SidePanelLabel>Kategorie</SidePanelLabel>
                <CategoriesList categories={data.categories} />
              </div>
            )}
          </div>
        </div>
      }
    />
  );
}
