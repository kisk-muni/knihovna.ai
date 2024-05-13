/* eslint-disable react/display-name */
"use client";

import { Fragment, forwardRef, useEffect, useState } from "react";
import NextLink from "next/link";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import { useParams } from "next/navigation";
import {
  IconCaretRight,
  IconExternalLink,
  IconFramework,
  IconList,
  IconX,
} from "./ui/icons";
import { FeedbackOpenButton } from "./feedback-submit-dialog";
import { Button } from "react-aria-components";
import { useApp } from "@/lib/hooks/use-app";
import NavbarMobileNavigation from "./navbar-mobile-navigation";

type NavigationItem = {
  title: string;
  href: string;
};

export type Navigation = (NavigationItem | NavigationMenuCollapsed)[];

type NavigationMenuCollapsed = {
  title: string;
  gridClassName?: string;
  items: NavigationMenuItem[];
};

type NavigationMenuItem = {
  title: string;
  href: string;
  external?: boolean;
  description: string;
  component?: (props: NavigationMenuItem) => JSX.Element;
};

const navigation: Navigation = [
  { title: "Domů", href: "/" },
  {
    title: "Nástroje",
    gridClassName: "sm:grid-cols-[0.75fr_1fr]",
    items: [
      {
        title: "Evaluační framework",
        description: "Vyhodnoťte připravenost vaší knihovny na budoucnost",
        href: "/evaluace",
        component: ({ href, title, description }) => (
          <li className="row-span-3 grid">
            <NavigationMenu.Link asChild>
              <a
                className="relative focus:shadow-neutral from-purple-700 to-emerald-400 flex
        h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px]"
                href={href}
              >
                <div className="opacity-0 hover:opacity-20 rounded-lg transition absolute inset-0 h-full w-full bg-gradient-to-br from-gray-900 to-gray-400"></div>
                <IconFramework />
                <div className="mt-4 mb-[7px] text-[18px] font-medium leading-[1.2] text-white">
                  {title}
                </div>
                <p className="text-text-50 text-[14px] leading-[1.3]">
                  {description}
                </p>
              </a>
            </NavigationMenu.Link>
          </li>
        ),
      },
      {
        title: "Facilitační scénáře",
        description: "Pomůcka k diskuzi o AI v knihovnách",
        href: "/facilitacni-scenare",
      },
      {
        title: "AI Chatbot",
        description: "Chatbot pro knihovníky",
        href: "https://chat.knihovna.ai",
        external: true,
      },
    ],
  },
  { title: "Materiály", href: "/materialy" },
  { title: "Průvodce AI", href: "/prirucky/ai-pro-knihovniky" },
  {
    title: "O projektu",
    gridClassName: "sm:grid-cols-[1fr_1fr]",
    items: [
      {
        title: "O projektu",
        href: "/project/about",
        description: "Obecné informace",
      },
      { title: "Blog", href: "/blog", description: "Aktuality z projektu" },
      {
        title: "Plán",
        href: "/project/plan",
        description: "Plánované aktivity a jejich aktuální stav",
      },
      {
        title: "Aktivity",
        href: "/project/activities",
        description: "Konkrétní aktivity, které děláme",
      },
      {
        title: "Sprinty",
        href: "/project/sprints",
        description: "Aktivita v projektu podle týdeních cyklů",
      },
      {
        title: "Náš tým",
        href: "/project/members",
        description: "Členové týmu a partneři",
      },
    ],
  },
];

export default function Navbar({ sticky = true }: { sticky?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const params = useParams<{ step?: string }>();
  const { setHtmlScrollAllowed } = useApp();
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
    setHtmlScrollAllowed(true);
  }, [pathname]);

  const toggleMobileMenu = (open: boolean) => {
    setIsMenuOpen(open);
    setHtmlScrollAllowed(!open);
  };

  useEffect(() => {
    if (params.step) setHide(true);
  }, [params, setHide]);

  if (hide) return null;

  return (
    <Fragment>
      <div
        className={classNames("justify-between items-start w-full", {
          "backdrop-blur-xl bg-[#FCF2E8]/50 sticky z-40 top-0 px-4 sm:px-6 lg:px-8 overflow-visible":
            sticky && !isMenuOpen,
          "bg-white px-1": !sticky,
          "bg-white fixed inset-0 z-30": isMenuOpen,
        })}
      >
        <div
          className={classNames(
            "flex justify-start items-center gap-2 py-2 mx-auto",
            {
              "border-b border-[#efdecc] md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl":
                sticky && !isMenuOpen,
              "w-full": !sticky,
              "px-4": isMenuOpen,
            }
          )}
        >
          <div>
            <NextLink href={"/"}>
              <Logo />
            </NextLink>
          </div>
          <NavigationMenu.Root
            className={classNames(
              "relative z-[50] hidden flex-col sm:flex-col sm:flex flex-1 justify-start w-full"
            )}
          >
            <NavigationMenu.List
              className={classNames(
                "center m-0 flex list-none rounded-[6px] px-1 flex-1"
              )}
            >
              {navigation.map((item, index) => {
                if ("items" in item) {
                  return (
                    <NavigationMenu.Item key={index}>
                      <NavigationMenuTrigger>
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul
                          className={classNames(
                            "one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px]",
                            item.gridClassName
                          )}
                        >
                          {item.items.map((subItem, subIndex) => {
                            if (!subItem.component)
                              return (
                                <ListItem
                                  href={subItem.href}
                                  title={subItem.title}
                                  external={subItem.external}
                                >
                                  {subItem.description}
                                </ListItem>
                              );

                            return (
                              <subItem.component key={subIndex} {...subItem} />
                            );
                          })}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenu.Item>
                  );
                }
                return (
                  <NavigationMenu.Item key={index}>
                    <NavigationMenuLink href={item.href}>
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenu.Item>
                );
              })}
              <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut -bottom-[9px] z-[100] overflow-hidden flex h-[8px] items-end justify-center transition-[width,transform_250ms_ease]">
                <div className="relative top-[50%] h-[10px] w-[10px] rotate-[45deg] z-[100] rounded-tl-[2px] border-t border-l bg-white" />
              </NavigationMenu.Indicator>
            </NavigationMenu.List>
            <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-start">
              <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn z-[1] data-[state=closed]:animate-scaleOut relative mt-[8px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-lg bg-white shadow-xl border transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
            </div>
          </NavigationMenu.Root>
          <Button
            onPress={() => toggleMobileMenu(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className={classNames(
              "sm:hidden ml-auto h-8 w-8 shrink-0 flex justify-center items-center hover:bg-white rounded-lg transition-all",
              {
                "rotate-90": isMenuOpen,
              }
            )}
          >
            {!isMenuOpen ? (
              <IconList className="h-6 w-6 block text-text" />
            ) : (
              <IconX className="h-6 w-6 block text-text" />
            )}
          </Button>
          <FeedbackOpenButton />
        </div>
        <NavbarMobileNavigation
          navigation={navigation}
          isMenuOpen={isMenuOpen}
        />
      </div>
    </Fragment>
  );
}

const ListItem = forwardRef(
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
              "data[active]:underline focus:shadow-[0_0_0_2px] focus:shadow-primary hover:bg-neutral-100 block select-none rounded-lg p-3 text-sm leading-none no-underline outline-none transition-colors",
              {
                "cursor-not-allowed": disabled,
              },
              className
            )}
            {...props}
          >
            <div className="text-text mb-0.5 font-medium leading-[1.2] flex items-center">
              {title}
              {external && <IconExternalLink className="h-4 w-4 ml-1" />}
            </div>
            <p className="text-text-600 leading-[1.4]">{children}</p>
          </NextLink>
        </NavigationMenu.Link>
      </li>
    );
  }
);

const NavigationMenuContent = forwardRef(
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
          "data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto",
          className
        )}
        {...props}
      >
        {children}
      </NavigationMenu.Content>
    );
  }
);

const NavigationMenuLink = forwardRef(
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
            "hover:bg-white focus:shadow-primary block select-none rounded-lg px-2 py-2 text-[15px] leading-none no-underline outline-none focus:shadow-[0_0_0_2px]",
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

const NavigationMenuTrigger = forwardRef(
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
          "hover:bg-white focus:shadow-primary select-none rounded-lg px-2 py-2 text-[15px] leading-none no-underline outline-none focus:shadow-[0_0_0_2px] group flex items-center justify-between gap-0.5",
          {
            "text-primary-600": isActive,
            "text-text hover:text-text-800": !isActive,
            "cursor-not-allowed": disabled,
          }
        )}
        {...props}
      >
        {children}
        <Carret />
      </NavigationMenu.Trigger>
    );
  }
);
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

export const Carret = () => (
  <IconCaretRight
    className="text-current h-3.5 w-3.5 rotate-90 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-90"
    aria-hidden
  />
);
