"use client";

import React from "react";
import {
  Navbar as Nav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import Logo from "./logo";
import siteConfig from "@/site-config";
import { usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/solid";
import classNames from "classnames";

export default function Navbar({ sticky = true }: { sticky?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  return (
    <Nav
      className={`px-0 flex justify-center items-center ${
        sticky ? "backdrop-blur-xl bg-[#FCF2E8]/50" : "bg-white"
      }`}
      height={"52px"}
      classNames={{
        base: sticky ? "" : "",
        wrapper: `py-0 w-full max-w-full mx-auto ${
          sticky
            ? " px-5 lg:px-8 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl"
            : "px-0"
        }`,
        menuItem:
          "data-[active=true]:text-primary data-[active=true]:font-semibold text-text hover:text-text/80",
        brand: "grow-0",
      }}
      position={sticky ? "sticky" : "static"}
      isBlurred={sticky}
      onMenuOpenChange={setIsMenuOpen}
    >
      <div
        className={classNames(
          "flex w-full justify-start items-center gap-4 py-3",
          {
            "border-b border-[#efdecc]": sticky,
          }
        )}
      >
        <NavbarMenuToggle
          icon={
            <div className="h-8 w-8 shrink-0 flex justify-center items-center">
              <Bars3Icon className="h-7 w-7 block text-text" />
            </div>
          }
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          srOnlyText={isMenuOpen ? "Zavřít menu" : "Otevřít menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href={"/"}>
            <Logo />
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          {siteConfig.navigation.map((link, i) => (
            <NavbarItem
              isActive={pathname === link.href}
              key={i}
              className="data-[active=true]:text-primary text-text hover:text-text/70"
            >
              <Link href={link.href}>{link.title}</Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      </div>
      <NavbarMenu>
        {siteConfig.navigation.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} className="block">
            <Link className="w-full py-1 block" href={item.href}>
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Nav>
  );
}
