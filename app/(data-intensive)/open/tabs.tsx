"use client";
import Container from "@/components/container";
import Navbar from "@/components/navbar";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    label: "Roadmap",
    href: "/open",
  },
  {
    label: "Sprinty",
    href: "/open/sprints",
  },
];

export default function Tabs() {
  const pathname = usePathname();
  return (
    <div className="w-full sticky z-20 top-0 bg-white border-b border-gray-200">
      <Navbar sticky={false} />
      <Container
        size="full"
        className="flex justify-start items-center relative -mt-0.5"
      >
        {tabs.map((tab) => (
          <Link
            href={tab.href}
            key={tab.href}
            className={classNames("mr-1", {
              "-ml-2": tab.href == tabs[0].href,
            })}
          >
            <button
              className={classNames(
                "block relative py-1 px-2 my-2 font-normal whitespace-nowrap rounded-lg text-text/90 hover:text-text hover:bg-sheet",
                {
                  "font-semibold text-text": pathname == tab.href,
                }
              )}
            >
              {tab.label}
            </button>
            <div
              className={classNames("h-[2px] rounded-full mx-2", {
                "bg-text": pathname == tab.href,
                "bg-transparent": pathname != tab.href,
              })}
            ></div>
          </Link>
        ))}
      </Container>
    </div>
  );
}
