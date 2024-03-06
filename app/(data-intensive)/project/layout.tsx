"use client";
import Tabs from "./tabs";
import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from "@/components/fallback";
import { Fragment } from "react";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import {
  IconMapTrifold,
  IconCompas,
  IconPlayCircle,
  IconSquare,
  IconUsers,
} from "@/components/ui/icons";

const tabs = [
  {
    label: "O projektu",
    icon: <IconCompas className="w-4 h-4 relative" />,
    href: "/project/about",
  },
  {
    label: "Aktivity",
    icon: <IconSquare className="w-4 h-4 relative" />,
    href: "/project/activities",
  },
  {
    label: "Sprinty",
    icon: <IconPlayCircle className="w-4 h-4 relative" />,
    href: "/project/sprints",
  },
  {
    label: "Plán",
    icon: <IconMapTrifold className="w-4 h-4 relative" />,
    href: "/project/plan",
  },
  {
    label: "Tým",
    icon: <IconUsers className="w-4 h-4 relative" />,
    href: "/project/members",
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
        <div className="h-full border-neutral-200 shrink-0 w-auto min-w-[160px] md:max-w-[240px] px-2 md:flex pt-3 flex-col items-start fixed md:sticky top-[53px] z-10 hidden">
          {tabs.map((tab) => (
            <Link
              href={tab.href}
              key={tab.href}
              className={classNames("mb-1 w-full flex")}
            >
              <button
                className={classNames(
                  "grow text-left relative py-1 px-2 text-sm flex items-center whitespace-nowrap rounded-md text-text hover:text-text hover:bg-sheet transition duration-150 ease-out",
                  {
                    "font-medium text-text bg-sheet": pathname == tab.href,
                  }
                )}
              >
                {tab?.icon && (
                  <span
                    className={classNames("mr-1.5 text-current", {
                      "text-text/50": pathname != tab.href,
                      "text-text/80": pathname == tab.href,
                    })}
                  >
                    {tab.icon}
                  </span>
                )}
                {tab.label}
              </button>
            </Link>
          ))}
        </div>
        <div className="grow border-l bg-neutral-100 overflow-x-clip border-neutral-200">
          <ErrorBoundary fallbackRender={Fallback}>{children}</ErrorBoundary>
        </div>
      </div>
    </Fragment>
  );
}
