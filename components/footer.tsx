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
    <footer className="mt-auto z-40">
      <Container className="py-12 grid md:flex md:items-center md:justify-between">
        <span className="text-base text-text font-medium text-center md:text-left">
          ©{" "}
          {siteConfig.sinceYear == currentYear
            ? currentYear
            : `${siteConfig.sinceYear} - ${currentYear}`}{" "}
          <Link
            href={siteConfig.siteUrl}
            className="underline hover:text-primary"
          >
            {siteConfig.title}
          </Link>
          . Všechna práva vyhrazena.
        </span>
        <ul className="flex flex-wrap justify-center md:justify-start items-center mt-6 lg:mt-0 text-base font-medium text-gray-500">
          {siteConfig.footerNavigation.map((item, i) => (
            <Item key={i} href={item.href} title={item.title} />
          ))}
        </ul>
      </Container>
    </footer>
  );
}
