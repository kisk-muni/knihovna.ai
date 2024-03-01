import { getThemes } from "@/app/actions";
import { Epic, State, Theme, Todo } from "@/db/schema";
import { MapIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { cache } from "react";
import { type Selection } from "react-aria-components";
import { StateLabel } from "./ui/state-label";

const loadThemes = cache(async (selectedState: Selection) => {
  return await getThemes(selectedState);
});

const ThemeRow = ({
  theme,
}: {
  theme: Theme & {
    state: State | null;
    isActive: boolean;
    isPast: boolean;
    epics: { epic: Epic & { state: State | null; todos: { todo: Todo }[] } }[];
  };
}) => {
  return (
    <div>
      <Link
        href={`/project/theme/${theme.id}`}
        className="px-8 border-b bg-sheet flex items-center hover:bg-hover/40 space-x-2 py-3"
      >
        <MapIcon className="w-4 h-4 text-text/50" />
        <span className="grow text-sm font-medium">{theme.name}</span>
        {theme.state && <StateLabel state={theme.state} />}
        {!theme.isActive && (
          <span className="bg-hover inline-block py-0.5 px-1.5 mr-6 rounded-md text-text/90 text-sm font-medium">
            {theme.isPast ? "Uplynulé" : "Nadcházející"}
          </span>
        )}
      </Link>
      <div>
        {theme.epics.map((epic, e) => (
          <EpicRow epic={epic.epic} key={e} />
        ))}
      </div>
    </div>
  );
};

export const EpicRow = ({
  epic,
}: {
  epic: Epic & { state: State | null; todos: { todo: Todo }[] };
}) => {
  return (
    <Link
      href={`/project/epic/${epic.id}`}
      className="block pl-16 pr-8 hover:bg-sheet py-3 border-b"
    >
      <div className="flex items-center">
        <Squares2X2Icon className="w-4 h-4 mr-2 relative text-text/50" />
        <span className="text-text/80 grow mr-6 text-sm">
          {epic.name}{" "}
          {!!epic.todos.length && (
            <span className="text-text/80 ml-4 text-sm">
              {`(${
                epic.todos.length === 1
                  ? "1 úkol"
                  : epic.todos.length < 5
                  ? `${epic.todos.length} úkoly`
                  : `${epic.todos.length} úkolů`
              })`}
            </span>
          )}
        </span>
        {epic.state && <StateLabel state={epic.state} />}
      </div>
      {/* <div>
{epic.epic.todos.map((todoRelation, to) => {
const todo = todoRelation.todo;
return (
  <div key={to} className="pl-6 py-4 border-b">
    <h4>{todo.name}</h4>
  </div>
);
})}
</div> */}
    </Link>
  );
};

export default async function DashboardPlanList({
  stateFilter: selectedState,
}: {
  stateFilter: Selection;
  displayFilter: Selection;
}) {
  const data = await loadThemes(selectedState);

  return (
    <div>
      {data.map((theme, t) => (
        <ThemeRow theme={theme} key={t} />
      ))}
    </div>
  );
}
