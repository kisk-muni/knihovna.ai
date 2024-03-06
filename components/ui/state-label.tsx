import { State } from "@/db/schema";
import classNames from "classnames";
import { TodoIcon } from "./todo-icon";

export const stateNames: { [key: string]: string } = {
  "in-progress": "Probíhající",
  "not-started": "Nezačaté",
  canceled: "Stornované",
  review: "Čeká na schválení",
  done: "Dokončené",
};

export const StateLabel = ({
  className,
  state: { standardised },
  icon,
}: {
  className?: string;
  icon?: "todo" | "plan";
  state: {
    standardised: string;
  };
}) => {
  return (
    <span
      className={classNames(
        "py-0.5 px-2 flex self-start w-max grow-0 rounded-full text-sm font-medium",
        {
          "bg-text-400 text-white": standardised === "backlog",
          "bg-emerald-600 text-white": standardised === "done",
          "bg-yellow-500 text-white": standardised === "in-progress",
          "bg-orange-500 text-white": standardised === "review",
          "bg-text-600 text-white": standardised === "not-started",
        },
        className
      )}
    >
      {icon == "todo" && (
        <TodoIcon
          className="h-5 -ml-1 w-5 mr-0.5 text-white"
          state={
            standardised as unknown as
              | "not-started"
              | "in-progress"
              | "review"
              | "done"
              | "cancelled"
          }
        />
      )}
      {stateNames[standardised]}
    </span>
  );
};
