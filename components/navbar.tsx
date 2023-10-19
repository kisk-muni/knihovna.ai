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
import { Button } from "./button";
import Link from "next/link";
import Logo from "./logo";
import siteConfig from "@/site-config";
import { usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/solid";

export default function Navbar({ sticky = true }: { sticky?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  return (
    <Nav
      className={`flex flex-col px-0 ${
        sticky ? "backdrop-blur-xl bg-white/80" : "bg-white"
      }`}
      classNames={{
        base: sticky
          ? "border-b border-[#e4dfdc66] shadow-lg shadow-[#e4dfdc66]"
          : "",
        wrapper: `py-2 justify-start mx-auto ${
          sticky
            ? "w-full md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-6 lg:px-8"
            : "px-6 lg:px-8"
        }`,
        menuItem:
          "data-[active=true]:text-primary data-[active=true]:font-semibold text-text hover:text-text/80",
      }}
      position={sticky ? "sticky" : "static"}
      isBlurred={sticky}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle
        icon={
          <div className="h-8 w-8 shrink-0 flex justify-center items-center">
            <Bars3Icon className="h-7 w-7 block text-text" />
          </div>
        }
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
      <NavbarContent justify="end" className="ml-auto">
        <NavbarItem>
          <Link href={"/open"}>
            <Button theme="primary" size="small">
              Otevřený projekt
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
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
