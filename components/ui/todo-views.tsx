/* eslint-disable @next/next/no-img-element */
import { Category, Epic, State, Todo, User } from "@/db/schema";
import Link from "next/link";
import { stateNames } from "./state-label";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { CompleteTodo, EpicTodos } from "@/app/actions";
import UserList from "./user-list";
import { TodoIcon } from "./todo-icon";
import { EpicsList } from "./epics-list";
import { CategoriesList } from "./categories-list";

type GroupedTodos = Record<string, CompleteTodo<EpicTodos>[]>;

const standardStates = [
  "not-started",
  "in-progress",
  "review",
  "done",
  "canceled",
];

export const TodoKanbanItem = ({
  todo: { name, id, users, categories, epics },
}: {
  todo: Todo & {
    state: State | null;
    users: { user: User }[];
    categories: { category: Category }[];
    epics: { epic: { doneTodosCount?: number } & Epic }[];
  };
}) => {
  return (
    <div className="px-4 pt-3 pb-4 rounded-lg bg-white border-b border-neutral-200">
      <div className="flex items-center mb-2">
        <Link
          href={`/project/activities/${id}`}
          className="text-text-950 text-[14px] hover:text-text-500"
        >
          {name}
        </Link>
      </div>

      <div className="flex justify-between space-x-2 space-y-2 flex-wrap items-end">
        <div className="space-y-1 max-w-[16rem]">
          <EpicsList epics={epics} />
          <CategoriesList categories={categories} />
        </div>
        <UserList users={users} className="grow justify-end" />
      </div>
    </div>
  );
};

export const StateLabel = ({
  state,
  count,
  name,
}: {
  state: string;
  count: number;
  name: string;
}) => {
  return (
    <div className="flex w-max space-x-3">
      <TodoIcon colorful className={"h-5 -ml-1 w-5 mr-0.5"} state={state} />
      <span className="text-sm text-text-950">{stateNames[state]}</span>
      <span className="text-[13px] text-text-400">{count}</span>
    </div>
  );
};

export const TodosKanban = ({ groups }: { groups: GroupedTodos }) => {
  return (
    <ScrollShadow
      orientation="horizontal"
      size={50}
      offset={10}
      className="w-full bg-muted overflow-x-scroll"
    >
      <div className="px-6 pb-8 space-x-6 flex">
        {standardStates?.map((state) => {
          if (!groups[state]) return null;
          return (
            <div
              key={state}
              className="bg-muted min-w-[22rem] mr-2 flex-1 max-w-[28rem] rounded-lg"
            >
              <div className="py-4">
                <StateLabel
                  state={state}
                  name={stateNames[state]}
                  count={groups[state].length}
                />
              </div>
              <div className="flex flex-col space-y-1">
                {groups[state]?.map((todo, t) => {
                  return <TodoKanbanItem key={t} todo={todo} />;
                })}
              </div>
            </div>
          );
        })}
        <div className="w-6 h-6 -ml-2 shrink-0"></div>
      </div>
    </ScrollShadow>
  );
};

export const TodoListItem = ({
  todo: { name, state, id, users },
}: {
  todo: Todo & { state: State | null; users: { user: User }[] };
}) => {
  return (
    <Link
      href={`/project/activities/${id}`}
      className="block pl-8 pr-6 transition duration-150 ease-out bg-white hover:bg-neutral-50 py-2.5 border-b border-neutral-100"
    >
      <div className="flex items-center">
        <span className="text-text-700 grow mr-6 text-sm">{name}</span>
        <UserList users={users} />
      </div>
    </Link>
  );
};

export const GroupedTodoList = ({ groups }: { groups: GroupedTodos }) => {
  return (
    <div className="pb-8">
      {standardStates?.map((state) => {
        if (!groups[state]) return null;
        return (
          <div key={state}>
            <div className="py-3 px-8 border-b border-neutral-100 bg-neutral-100">
              <StateLabel
                state={state}
                name={stateNames[state]}
                count={groups[state].length}
              />
            </div>
            <div>
              {groups[state]?.map((todo, t) => {
                return <TodoListItem key={t} todo={todo} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
