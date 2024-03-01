import { State } from "@/db/schema";
import classNames from "classnames";

export const StateLabel = ({
  state: { standardised, name },
}: {
  state: State;
}) => {
  const stateNames: { [key: string]: string } = {
    "in-progress": "Probíhající",
    "not-started": "Nezačaté",
    canceled: "Stornované",
    review: "Čeká na schválení",
    done: "Dokončené",
  };

  return (
    <span
      className={classNames(
        "inline-block py-0.5 px-1.5 rounded-md text-sm font-medium",
        {
          "bg-emerald-500 text-white": name === "Done",
          "bg-yellow-500 text-white": ["In progress", "In Progress"].includes(
            name
          ),
          "bg-orange-500 text-white": ["Review"].includes(name),
          "bg-hover text-text/90": ["Not started", "Not Started"].includes(
            name
          ),
        }
      )}
    >
      {stateNames[standardised]}
    </span>
  );
};
