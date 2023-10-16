"use client";

import React from "react";
import {
  Navbar,
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

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  return (
    <Navbar
      className="py-2 backdrop-blur-xl bg-white/40"
      classNames={{
        wrapper: "max-w-screen-xl mx-auto px-6 lg:px-8",
        menuItem:
          "data-[active=true]:text-primary text-text hover:text-text/80",
      }}
      maxWidth="md"
      position="sticky"
      isBordered
      isBlurred={true}
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
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {siteConfig.navigation.map((link, i) => (
          <NavbarItem
            isActive={pathname === link.href}
            key={i}
            className="data-[active=true]:text-primary text-text hover:text-text/80"
          >
            <Link href={link.href}>{link.title}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href={"/open"}>
            <Button theme="dark-gray" size="small">
              Projektový plán
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
    </Navbar>
  );
}
