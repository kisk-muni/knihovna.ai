import Container from "@/components/container";
import Headline from "@/components/headline";
import siteConfig from "@/site-config";
import Link from "next/link";

export default function DesignPage() {
  return (
    <main className="mt-24 mb-24">
      <Container className="mt-12 pb-40 flex flex-col items-center justify-center">
        <Headline as="h1" level="1">
          Připravujeme
        </Headline>
        {siteConfig.privateNavigation.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className="text-xl mb-6 font-semibold text-text hover:text-primary"
          >
            {item.title}
          </Link>
        ))}
      </Container>
    </main>
  );
}
