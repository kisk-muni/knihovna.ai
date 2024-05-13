/* eslint-disable react/display-name */
"use client";

import { forwardRef } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import { Carret, Navigation } from "./navbar";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { IconExternalLink } from "./ui/icons";

export default function NavbarMobileNavigation({
  isMenuOpen,
  navigation,
}: {
  isMenuOpen: boolean;
  navigation: Navigation;
}) {
  return (
    <NavigationMenu.Root
      orientation="vertical"
      className={classNames(
        "sm:hidden flex-1 w-full h-full flex flex-col overflow-y-scroll px-4",
        {
          hidden: !isMenuOpen,
        }
      )}
    >
      <NavigationMenu.List>
        {navigation.map((item, index) => {
          if ("items" in item) {
            return (
              <NavigationMenu.Item key={index} className="overflow-hidden">
                <MobileNavigationMenuTrigger>
                  {item.title}
                </MobileNavigationMenuTrigger>
                <MobileNavigationMenuContent>
                  <ul
                    className={classNames(
                      "m-0 flex flex-col list-none p-0",
                      item.gridClassName
                    )}
                  >
                    {item.items.map((subItem, subIndex) => {
                      return (
                        <MobileListItem
                          key={subIndex}
                          href={subItem.href}
                          title={subItem.title}
                          external={subItem.external}
                        >
                          {subItem.description}
                        </MobileListItem>
                      );
                    })}
                  </ul>
                </MobileNavigationMenuContent>
              </NavigationMenu.Item>
            );
          }
          return (
            <NavigationMenu.Item key={index}>
              <MobileNavigationMenuLink href={item.href}>
                {item.title}
              </MobileNavigationMenuLink>
            </NavigationMenu.Item>
          );
        })}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

const MobileNavigationMenuTrigger = forwardRef(
  ({
    disabled,
    root,
    children,
    ...props
  }: {
    disabled?: boolean;
    root?: string;
    children: React.ReactNode;
  }) => {
    const pathname = usePathname();
    const isActive = root === pathname.split("/")[1];
    return (
      <NavigationMenu.Trigger
        className={classNames(
          "hover:bg-white border-t w-full select-none py-4 text-base leading-none no-underline outline-none group flex items-center justify-between gap-0.5",
          {
            "text-primary-600": isActive,
            "text-text hover:text-text-800": !isActive,
            "cursor-not-allowed": disabled,
          }
        )}
        onPointerMove={(event) => event.preventDefault()}
        onPointerLeave={(event) => event.preventDefault()}
        {...props}
      >
        {children}
        <Carret />
      </NavigationMenu.Trigger>
    );
  }
);

const MobileNavigationMenuContent = forwardRef(
  ({
    className,
    children,
    ...props
  }: {
    className?: string;
    children: React.ReactNode;
  }) => {
    return (
      <NavigationMenu.Content
        className={classNames(
          "data-[state=open]:animate-mobileNavSlideDown data-[state=closed]:animate-mobileNavSlideUp overflow-hidden w-full transition-transform duration-600",
          className
        )}
        onPointerMove={(event) => event.preventDefault()}
        onPointerLeave={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
        {...props}
      >
        {children}
      </NavigationMenu.Content>
    );
  }
);

const MobileListItem = forwardRef(
  ({
    disabled,
    external,
    className,
    href,
    children,
    title,
    ...props
  }: {
    disabled?: boolean;
    external?: boolean;
    className?: string;
    href: string;
    children: React.ReactNode;
    title: string;
  }) => {
    const pathname = usePathname();
    const isActive = href === pathname;
    return (
      <li>
        <NavigationMenu.Link asChild active={isActive}>
          <NextLink
            href={href}
            className={classNames(
              "w-full data[active]:underline focus:shadow-[0_0_0_2px] focus:shadow-primary hover:bg-neutral-50 block select-none pl-4 py-4 text-sm leading-none no-underline outline-none transition-colors",
              {
                "cursor-not-allowed": disabled,
              },
              className
            )}
            {...props}
          >
            <div className="text-text-600 mb-0.5 leading-[1.2] flex items-center">
              {title}
              {external && <IconExternalLink className="h-4 w-4 ml-1" />}
            </div>
          </NextLink>
        </NavigationMenu.Link>
      </li>
    );
  }
);

const MobileNavigationMenuLink = forwardRef(
  ({
    disabled,
    href,
    children,
    ...props
  }: {
    disabled?: boolean;
    href: string;
    children: React.ReactNode;
  }) => {
    const pathname = usePathname();
    const isActive = href === pathname;
    return (
      <NavigationMenu.Link asChild active={isActive}>
        <NextLink
          href={href}
          className={classNames(
            "hover:bg-white border-t focus:shadow-primary block select-none py-4 text-base leading-none no-underline outline-none focus:shadow-[0_0_0_2px]",
            {
              "text-primary-600": isActive,
              "text-text hover:text-text-800": !isActive,
              "cursor-not-allowed": disabled,
            }
          )}
          {...props}
        >
          {children}
        </NextLink>
      </NavigationMenu.Link>
    );
  }
);
