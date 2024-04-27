import siteConfig from "@/site-config";
import Link from "next/link";
import Container from "./ui/container";
import classNames from "classnames";

function Item({ href, title }: { href: string; title: string }) {
  return (
    <li>
      <Link
        href={href}
        className="ml-4 hover:underline md:ml-6  transition duration-150 ease-out"
      >
        {title}
      </Link>
    </li>
  );
}

export default function Footer({
  fullWidth = false,
  size = "base",
}: {
  fullWidth?: boolean;
  size?: "base" | "small";
}) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-auto z-40">
      <Container
        fullWidth={fullWidth}
        className={classNames(
          "grid md:flex md:items-center md:justify-between",
          {
            "py-12": size === "base",
            "py-6": size === "small",
          }
        )}
      >
        <span className="text-base text-text font-medium text-center md:text-left">
          ©{" "}
          {siteConfig.sinceYear == currentYear
            ? currentYear
            : `${siteConfig.sinceYear} - ${currentYear}`}{" "}
          <Link
            href={siteConfig.siteUrl}
            className="underline hover:text-primary transition duration-150 ease-out"
          >
            {siteConfig.title}
          </Link>
          . Všechna práva vyhrazena.
        </span>
        <ul className="flex flex-wrap justify-center md:justify-start items-center mt-6 lg:mt-0 text-base font-normal text-text">
          {siteConfig.footerNavigation.map((item, i) => (
            <Item key={i} href={item.href} title={item.title} />
          ))}
        </ul>
      </Container>
    </footer>
  );
}
