import { State } from "@/db/schema";
import classNames from "classnames";

export const stateNames: { [key: string]: string } = {
  "in-progress": "Probíhající",
  "not-started": "Nezačaté",
  canceled: "Stornované",
  review: "Čeká na schválení",
  done: "Dokončené",
};

export const StateLabel = ({
  state: { standardised },
}: {
  state: {
    standardised: State["standardised"];
  };
}) => {
  return (
    <span
      className={classNames(
        "inline-block py-0.5 px-1.5 rounded-md text-sm font-medium",
        {
          "bg-emerald-500 text-white": standardised === "done",
          "bg-yellow-500 text-white": standardised === "in-progress",
          "bg-orange-500 text-white": standardised === "review",
          "bg-hover text-text/90": standardised === "not-started",
        }
      )}
    >
      {stateNames[standardised]}
    </span>
  );
};
