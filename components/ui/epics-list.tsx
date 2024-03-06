/* eslint-disable @next/next/no-img-element */
import { Epic } from "@/db/schema";
import Link from "next/link";
import { Squares2X2Icon } from "@heroicons/react/24/solid";
import CircularStatus from "./circular-status";

export const EpicsList = ({ epics }: { epics: { epic: Epic }[] }) => {
  return (
    <div className="space-y-1">
      {epics?.map(({ epic }, e) => (
        <Link
          href={`/project/epic/${epic.id}`}
          key={e}
          className="text-[13px] flex text-text items-center p-0.5 bg-neutral-100 hover:bg-neutral-200 whitespace-nowrap rounded-md px-1"
        >
          <Squares2X2Icon className="w-3 h-3 mr-0.5 -mt-px relative text-text-500" />{" "}
          {epic.name.length > 32
            ? epic.name.substring(0, 32) + "..."
            : epic.name}
          {epic.progress !== undefined && epic.progress != null && (
            <CircularStatus
              svgClassName="h-4 w-4 ml-1"
              value={parseFloat(epic.progress)}
            />
          )}
        </Link>
      ))}
    </div>
  );
};
