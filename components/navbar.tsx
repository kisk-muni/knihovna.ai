"use client";
import siteConfig from "@/site-config";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import Container from "./container";

function Item({ href, title }: { href: string; title: string }) {
  return (
    <li>
      <Link
        href={href}
        className="block py-2 pl-3 pr-4 text-base text-text font-semibold hover:bg-sheet md:hover:bg-transparent md:hover:text-primary md:p-1 transition duration-150 ease-out"
      >
        {title}
      </Link>
    </li>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const [stick, setStick] = useState(false);

  const changeNavBg = () => {
    window.scrollY >= 1 ? setStick(true) : setStick(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavBg);
    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  return (
    <nav
      className={classNames(
        "fixed h-[72px] w-full flex items-center z-20 top-0 left-0 transition-[height,padding] ease-out delay-50",
        {
          "bg-transparent": pathname === "/" && !stick,
          "border-b border-sheet/70 bg-white drop-shadow-sm": stick,
        }
      )}
    >
      <Container className="flex flex-wrap items-center justify-between mx-auto">
        <Link
          href="/"
          className={classNames(
            "self-center whitespace-nowrap text-text font-bold transition ease-out delay-150"
          )}
        >
          {siteConfig.title}
        </Link>
        <div className="flex lg:hidden md:order-2">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className={classNames(
              "inline-flex items-center -mr-1.5 p-2 text-sm text-text rounded-lg focus:outline-none focus:ring-2",
              {
                "hover:bg-primary/20 focus:ring-primary/30": !stick,
                "hover:bg-sheet focus:ring-sheet": stick,
              }
            )}
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Otevřít navigaci</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div
          className={classNames(
            "items-center hidden w-full lg:flex md:w-auto md:order-1"
          )}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
            {siteConfig.navigation
              .filter((item) => item.href != pathname)
              .map((item, i) => (
                <Item key={i} href={item.href} title={item.title} />
              ))}
          </ul>
        </div>

        {showMenu && (
          <Fragment>
            <div className="lg:hidden" role="dialog" aria-modal="true">
              <div className="fixed min-h-screen inset-0 z-90 w-full overflow-y-auto bg-white px-8 py-6">
                <div className="flex items-center justify-between">
                  <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowMenu(!showMenu)}
                    className="-m-2.5 -mr-3.5 rounded-lg p-2 text-text hover:bg-sheet focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    <span className="sr-only">Close menu</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y-2">
                    <div className="space-y-2 py-6">
                      {siteConfig.navigation
                        .filter((item) => item.href != pathname)
                        .map((item, i) => (
                          <Link
                            href={item.href}
                            key={i}
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-sheet"
                          >
                            {item.title}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </Container>
    </nav>
  );
}
