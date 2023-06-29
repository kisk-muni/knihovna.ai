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
        className="block py-2 pl-3 pr-4 text-sm text-text font-semibold hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-1"
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

  return (
    <nav
      className={classNames(
        "fixed h-[70px] w-full z-20 top-0 left-0 transition ease-out delay-50",
        {
          "bg-transparent": pathname === "/" && !stick,
          "border-b border-sheet/70 bg-white drop-shadow-sm": stick,
        }
      )}
    >
      <Container className="flex flex-wrap items-center justify-between mx-auto py-5">
        <Link href="/" className="flex items-center">
          <span
            className={classNames(
              "self-center whitespace-nowrap text-text transition ease-out delay-150"
            )}
          >
            {siteConfig.title}
          </span>
        </Link>
        <div className="flex lg:hidden md:order-2">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
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
          <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-primary-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
            {siteConfig.navigation.map((item, i) => (
              <Item key={i} href={item.href} title={item.title} />
            ))}
          </ul>
        </div>

        {showMenu && (
          <Fragment>
            <div className="lg:hidden " role="dialog" aria-modal="true">
              <div className="fixed inset-0 z-50"></div>
              <div className="fixed min-h-screen inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowMenu(!showMenu)}
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
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
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      {siteConfig.navigation.map((item, i) => (
                        <Link
                          href={item.href}
                          key={i}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
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
