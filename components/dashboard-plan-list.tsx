import { getThemes } from "@/app/actions";
import { Epic, State, Theme, Todo } from "@/db/schema";
import Link from "next/link";
import { cache } from "react";
import { type Selection } from "react-aria-components";
import { StateLabel } from "./ui/state-label";
import { IconMapTrifold, IconSquaresFour } from "./ui/icons";
import CircularProgress from "./ui/circular-status";

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
      <div className="px-6 border-b border-neutral-200 bg-sheet flex items-center space-x-2 py-2.5">
        <IconMapTrifold className="w-4 h-4 text-text/50" />
        <span className="grow text-sm font-medium">{theme.name}</span>
        {theme.state && <StateLabel state={theme.state} />}
        {!theme.isActive && (
          <span className="bg-hover inline-block py-0.5 px-1.5 mr-6 rounded-md text-text/90 text-sm font-medium">
            {theme.isPast ? "Uplynulé" : "Nadcházející"}
          </span>
        )}
      </div>
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
      className="block pl-16 pr-6 bg-white hover:bg-sheet py-2.5 border-b border-neutral-200 transition duration-150 ease-out"
    >
      <div className="flex items-center">
        <IconSquaresFour.filled className="w-3 h-3 mr-2 relative text-text-400" />
        <div className="text-text-900 grow flex space-x-1.5 items-center mr-6 text-sm">
          <span>{epic.name}</span>
          {epic.progress !== undefined && epic.progress != null && (
            <CircularProgress
              svgClassName="h-4 w-4"
              value={parseFloat(epic.progress)}
            />
          )}
          {!!epic.todos.length && (
            <span className="text-text-400 text-[13px]">
              {`${
                epic.todos.length === 1
                  ? "1 aktivita"
                  : epic.todos.length < 5
                  ? `${epic.todos.length} aktivity`
                  : `${epic.todos.length} aktivit`
              }`}
            </span>
          )}
        </div>
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
  displayFilter?: Selection;
}) {
  const data = await loadThemes(selectedState);
  if (!data) return null;
  return (
    <div>
      {data?.map((theme, t) => (
        <ThemeRow theme={theme} key={t} />
      ))}
    </div>
  );
}
