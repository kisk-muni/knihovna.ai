"use client";
import Tabs from "./tabs";
import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from "@/components/fallback";
import { Fragment } from "react";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import {
  CheckCircleIcon,
  CheckIcon,
  HomeIcon,
  MapIcon,
  QueueListIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

const tabs = [
  {
    label: "Přehled",
    href: "/project",
  },
  {
    label: "Úkoly",
    icon: <CheckCircleIcon className="w-4 h-4 relative text-text/50" />,
    href: "/project/todos",
  },
  {
    label: "Sprinty",
    icon: <QueueListIcon className="w-4 h-4 relative text-text/50" />,
    href: "/project/sprints",
  },
  {
    label: "Plán",
    icon: <MapIcon className="w-4 h-4 relative text-text/50" />,
    href: "/project/plan",
  },
  {
    label: "Tým",
    icon: <UsersIcon className="w-4 h-4 relative text-text/50" />,
    href: "/project/tasks",
  },
];

export default function OpenProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Fragment>
      <Tabs />
      <div className="flex h-full w-full grow">
        <div className="h-full border-gray-200 shrink-0 w-auto min-w-[160px] md:max-w-[240px] px-2 md:flex pt-3 flex-col items-start fixed md:sticky top-[53px] z-10 hidden">
          {tabs.map((tab) => (
            <Link
              href={tab.href}
              key={tab.href}
              className={classNames("mb-1 w-full flex")}
            >
              <button
                className={classNames(
                  "grow text-left relative py-1 px-2 text-sm flex items-center font-normal whitespace-nowrap rounded-md text-text hover:text-text hover:bg-sheet transition duration-150 ease-out",
                  {
                    "font-bold text-text bg-sheet": pathname == tab.href,
                  }
                )}
              >
                {tab?.icon && <span className="mr-1.5">{tab.icon}</span>}
                {tab.label}
              </button>
            </Link>
          ))}
        </div>
        <div className="grow border-l overflow-x-clip border-gray-200">
          <ErrorBoundary fallbackRender={Fallback}>{children}</ErrorBoundary>
        </div>
      </div>
    </Fragment>
  );
}
