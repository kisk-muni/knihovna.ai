"use client";
import Container from "@/components/container";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    label: "Přehled",
    href: "/prehled",
  },
  {
    label: "Úkoly",
    href: "/prehled/ukoly",
  },
];

export default function Tabs() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 border-b-2 pt-[72px] z-30 border-b border-sheet/70 bg-white drop-shadow-sm">
      <Container>
        <div className="flex w-full justify-start items-center relative -mb-0.5">
          {tabs.map((tab) => (
            <Link
              href={tab.href}
              key={tab.href}
              className={classNames("mr-1", {
                "-ml-3": tab.href == tabs[0].href,
              })}
            >
              <button
                className={classNames(
                  "block relative py-1.5 px-3 mb-2 font-medium whitespace-nowrap rounded-lg text-text/90 hover:text-text hover:bg-sheet active:bg-gray-200",
                  {
                    "bg-sheet": pathname == tab.href,
                  }
                )}
              >
                {tab.label}
              </button>
              <div
                className={classNames("h-[2px] rounded-full mx-3", {
                  "bg-text": pathname == tab.href,
                  "bg-transparent": pathname != tab.href,
                })}
              ></div>
            </Link>
          ))}
        </div>
      </Container>
    </nav>
  );
}
