/* eslint-disable @next/next/no-img-element */
import { Category, Epic, State, Todo, User } from "@/db/schema";
import Link from "next/link";
import { StateLabel } from "./state-label";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import classNames from "classnames";
import { Square2StackIcon, Squares2X2Icon } from "@heroicons/react/24/solid";

type GroupedTodos = Record<
  string,
  (Todo & {
    state: State | null;
    users: { user: User }[];
    categories: { category: Category }[];
    epics: { epic: Epic }[];
  })[]
>;

const standardStates = [
  "not-started",
  "in-progress",
  "review",
  "done",
  "canceled",
];

export const UserList = ({
  users,
  className,
}: {
  users: { user: User }[];
  className?: string;
}) => {
  return (
    <div className={classNames("flex flex-wrap ml-1 items-center", className)}>
      {users.slice(0, 4)?.map(({ user }, i) => (
        <div
          key={i}
          className="h-6 w-6 -ml-1 bg-gray-300 rounded-full ring-1 ring-white overflow-hidden"
        >
          {user.avatar && <img src={user.avatar} alt={user.name} />}
        </div>
      ))}
      {users.length > 4 && (
        <span className="text-[13px] ml-0.5">+{users.length - 4}</span>
      )}
    </div>
  );
};

export const EpicsList = ({ epics }: { epics: { epic: Epic }[] }) => {
  return (
    <div className="space-y-1">
      {epics?.map(({ epic }, e) => (
        <span
          key={e}
          className="text-[13px] inline-block flex items-center p-0.5 bg-gray-100 whitespace-nowrap rounded-md px-1"
        >
          <Squares2X2Icon className="w-3 h-3 mr-0.5 -mt-px relative text-text/70" />{" "}
          {epic.name.length > 32
            ? epic.name.substring(0, 32) + "..."
            : epic.name}
        </span>
      ))}
    </div>
  );
};

export const CategoriesList = ({
  categories,
}: {
  categories: { category: Category }[];
}) => {
  return (
    <div className="space-x-1 flex">
      {categories.map(({ category }, c) => (
        <span
          key={c}
          className="text-[13px] inline-block flex p-0.5 bg-gray-100 whitespace-nowrap rounded-md px-1"
        >
          {category.name}
        </span>
      ))}
    </div>
  );
};

export const TodoKanbanItem = ({
  todo: { name, id, users, categories, epics },
}: {
  todo: Todo & {
    state: State | null;
    users: { user: User }[];
    categories: { category: Category }[];
    epics: { epic: Epic }[];
  };
}) => {
  return (
    <div className="px-3 py-2 rounded-lg bg-white border-b boder-gray-200">
      <div className="flex items-center mb-1">
        <Link
          href={`/plan/todos/${id}`}
          className="text-text/80 text-sm hover:text-text"
        >
          {name}
        </Link>
      </div>

      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <EpicsList epics={epics} />
          <CategoriesList categories={categories} />
        </div>
        <UserList users={users} />
      </div>
    </div>
  );
};

export const TodosKanban = ({ groups }: { groups: GroupedTodos }) => {
  return (
    <ScrollShadow
      orientation="horizontal"
      size={50}
      offset={10}
      className="w-full overflow-x-scroll"
    >
      <div className="px-8 pb-8 flex">
        {standardStates?.map((state) => {
          if (!groups[state]) return null;
          return (
            <div
              key={state}
              className="p-2 bg-sheet min-w-[18rem] mr-2 flex-1 max-w-[28rem] rounded-lg"
            >
              <div className="pb-2">
                <StateLabel state={{ standardised: state }} />
              </div>
              <div className="flex flex-col space-y-1">
                {groups[state]?.map((todo, t) => {
                  return <TodoKanbanItem key={t} todo={todo} />;
                })}
              </div>
            </div>
          );
        })}
        <div className="w-8 h-8 -ml-2 shrink-0"></div>
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
      href={`/plan/todos/${id}`}
      className="block px-8 hover:bg-sheet py-2.5 border-b"
    >
      <div className="flex items-center">
        <span className="text-text/80 grow mr-6 text-sm">{name}</span>
        <UserList className="mr-6" users={users} />
        {state && <StateLabel state={state} />}
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
            <div className="py-3 px-8 border-b bg-sheet">
              <StateLabel state={{ standardised: state }} />
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
