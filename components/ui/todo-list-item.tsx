import { State, Todo } from "@/db/schema";
import Link from "next/link";
import { StateLabel } from "./state-label";

export const TodoListItem = ({
  todo: { name, state, id },
}: {
  todo: Todo & { state: State | null };
}) => {
  return (
    <Link
      href={`/plan/todos/${id}`}
      className="block px-8 hover:bg-sheet py-3 border-b"
    >
      <div className="flex items-center">
        <span className="text-text/80 grow mr-6 text-sm">{name}</span>
        {state && <StateLabel state={state} />}
      </div>
    </Link>
  );
};
