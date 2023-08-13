"use client";

import { Button } from "@/components/button";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";

type NavigationItem = {
  name: string;
  href: string;
};

export function SideNavigation({ items }: { items: NavigationItem[] }) {
  const pathname = usePathname();
  return (
    <ul className="mb-6">
      {items.slice(1).map((link, i) => (
        <li className="mb-5" key={i}>
          <Link
            href={link.href}
            className={classNames("text-lg hover:text-primary font-medium", {
              "text-primary": pathname === link.href,
              "text-text": pathname !== link.href,
            })}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Pagination({ items }: { items: NavigationItem[] }) {
  let pathname = usePathname();
  if (pathname === "/prirucka") pathname = "/prirucka/";
  const currentIndex = items.findIndex((item) => item.href === pathname);
  const prev = currentIndex > 0 ? items[currentIndex - 1] : null;
  const next =
    currentIndex <= items.length - 1 ? items[currentIndex + 1] : null;
  return (
    <div className="mt-8 mb-12 flex justify-between -mx-6">
      {prev && prev?.href && (
        <div className="flex grow justify-start">
          <Link href={prev.href}>
            <Button theme="gray" size="base" variant="ghost">
              ← {prev.name}
            </Button>
          </Link>
        </div>
      )}
      {next && next?.href && (
        <div className="flex grow justify-end">
          <Link href={next.href}>
            <Button theme="gray" size="base" variant="ghost">
              {next.name} →
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
