"use client";

import { forwardRef, useEffect, useState } from "react";
import NextLink from "next/link";
import Logo from "./logo";
import siteConfig from "@/site-config";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import { useParams } from "next/navigation";
import { IconCaretRight, IconExternalLink, IconFramework } from "./ui/icons";
import { FeedbackOpenButton } from "./feedback-submit-dialog";

export default function Navbar({ sticky = true }: { sticky?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const params = useParams<{ step?: string }>();
  useEffect(() => {
    if (params.step) setHide(true);
  }, [params, setHide]);

  if (hide) return null;
  return (
    <div
      className={classNames("justify-center items-center", {
        "backdrop-blur-xl bg-[#FCF2E8]/50 sticky z-40 top-0 px-6 lg:px-8":
          sticky,
        "bg-white px-1": !sticky,
      })}
    >
      <div
        className={classNames(
          "flex justify-start items-center gap-2 py-2 mx-auto",
          {
            "border-b border-[#efdecc] top-0 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl":
              sticky,
            "w-full": !sticky,
          }
        )}
      >
        {/*         <NavbarMenuToggle
          icon={
            <div className="h-8 w-8 shrink-0 flex justify-center items-center">
              <Bars3Icon className="h-7 w-7 block text-text" />
            </div>
          }
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          srOnlyText={isMenuOpen ? "Zavřít menu" : "Otevřít menu"}
          className="sm:hidden"
        /> */}
        <div>
          <NextLink href={"/"}>
            <Logo />
          </NextLink>
        </div>
        <NavigationMenu.Root className="relative z-[50] hidden sm:flex flex-1 justify-start w-full">
          <NavigationMenu.List className="center m-0 flex list-none rounded-[6px] px-1 flex-1">
            <NavigationMenu.Item>
              <NavigationMenuLink href={siteConfig.navigation[0].href}>
                {siteConfig.navigation[0].title}
              </NavigationMenuLink>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenuTrigger>Nástroje</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
                  <li className="row-span-3 grid">
                    <NavigationMenu.Link asChild>
                      <a
                        className="focus:shadow-neutral from-purple-700 to-emerald-400 flex
                    h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px]"
                        href="/evaluace"
                      >
                        <IconFramework />
                        <div className="mt-4 mb-[7px] text-[18px] font-medium leading-[1.2] text-white">
                          Evaluační framework
                        </div>
                        <p className="text-text-50 text-[14px] leading-[1.3]">
                          Vyhodnoťte připravenost vaší knihovny na budoucnost
                        </p>
                      </a>
                    </NavigationMenu.Link>
                  </li>

                  <ListItem
                    href="/facilitacni-scenare"
                    title="Facilitační scénáře"
                  >
                    Pomůcka k diskuzi o AI v knihovnách
                  </ListItem>
                  <ListItem
                    href="https://chat.knihovna.ai"
                    title="AI Chatbot"
                    external
                  >
                    Chatbot pro knihovníky{" "}
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenuLink href={siteConfig.navigation[1].href}>
                {siteConfig.navigation[1].title}
              </NavigationMenuLink>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenuLink href={"/prirucky/ai-pro-knihovniky"}>
                Průvodce AI
              </NavigationMenuLink>
            </NavigationMenu.Item>
            <NavigationMenu.Item className="justify-self-end">
              <NavigationMenuTrigger root="project">
                O projektu
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[1fr_1fr]">
                  <ListItem href="/project/about" title="O projektu">
                    Obecné informace
                  </ListItem>
                  <ListItem href="/blog" title="Blog">
                    Aktuality z projektu
                  </ListItem>
                  <ListItem href="/project/plan" title="Plán">
                    Plánované aktivity a jejich aktuální stav
                  </ListItem>
                  <ListItem href="/project/activities" title="Aktivity">
                    Konkrétní aktivity, které děláme
                  </ListItem>
                  <ListItem href="/project/sprints" title="Sprinty">
                    Aktivita v projektu podle týdeních cyklů
                  </ListItem>
                  <ListItem href="/project/members" title="Náš tým">
                    Členové týmu a partneři
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenu.Item>

            <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut -bottom-[9px] z-[100] overflow-hidden flex h-[8px] items-end justify-center transition-[width,transform_250ms_ease]">
              <div className="relative top-[50%] h-[10px] w-[10px] rotate-[45deg] z-[100] rounded-tl-[2px] border-t border-l bg-white" />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>
          <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-start">
            <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn z-[1] data-[state=closed]:animate-scaleOut relative mt-[8px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-lg bg-white shadow-xl border transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
          </div>
        </NavigationMenu.Root>
        <FeedbackOpenButton />
      </div>
      <div className={classNames("sm:hidden")}>
        {siteConfig.navigation.map((item, index) => (
          <span key={`${item}-${index}`} className="block">
            <NextLink className="w-full py-1 block" href={item.href}>
              {item.title}
            </NextLink>
          </span>
        ))}
      </div>
    </div>
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
ListItem.displayName = "ListItem";

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
      <li>
        <NavigationMenu.Content
          className={classNames(
            "data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto",
            className
          )}
          {...props}
        >
          {children}
        </NavigationMenu.Content>
      </li>
    );
  }
);
NavigationMenuContent.displayName = "NavigationContent";

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
NavigationMenuLink.displayName = "NavigationMenuLink";

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

const Carret = () => (
  <IconCaretRight
    className="text-current -mr-[4px] h-3.5 w-3.5 rotate-90 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-90"
    aria-hidden
  />
);
