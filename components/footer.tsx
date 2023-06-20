import siteConfig from "@/site-config";
import Link from "next/link";
import Container from "./container";

function Item({ href, title }: { href: string; title: string }) {
  return (
    <li>
      <Link href={href} className="ml-4 hover:underline md:ml-6">
        {title}
      </Link>
    </li>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-auto z-50">
      <Container className="py-12 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          ©{" "}
          {siteConfig.sinceYear == currentYear
            ? currentYear
            : `${siteConfig.sinceYear} - ${currentYear}`}{" "}
          <a href={siteConfig.siteUrl} className="hover:underline">
            {siteConfig.title}
          </a>
          . Všechna práva vyhrazena.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          {siteConfig.footerNavigation.map((item, i) => (
            <Item key={i} href={item.href} title={item.title} />
          ))}
        </ul>
      </Container>
    </footer>
  );
}
