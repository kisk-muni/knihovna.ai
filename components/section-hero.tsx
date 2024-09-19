import Link from "next/link";
import Container from "./ui/container";
import { Button } from "./ui/button";
import TypeformButton from "./ui/typeform-button";
import { IconDownload } from "./ui/icons";

export default function SectionHero() {
  return (
    <section className="relative">
      <Container>
        <div className="relative max-w-3xl mx-auto pt-20 pb-20 lg:pt-32">
          <div className="text-center">
            <div
              className={
                "mt-6 text-primary [&>h1]:leading-normal [&>h1]:text-5xl  2xl:[&>h1]:text-6xl 2xl:[&>h1]:leading-normal [&>h1]:font-extrabold [&>h1]:mb-6 [&>p]:mb-6 [&>p]:text-xl [&>p]:font-normal [&>p]:leading-relaxed [&>p]:text-text"
              }
            >
              <h1>
                Služby pro adaptaci knihoven v éře{" "}
                <span className="text-text">umělé inteligence</span>.
              </h1>
              <p>
                Knihovna.ai pomáhá vyhodnotit vaši připravenost na
                celospolečenské změny a dává vašemu týmu nástroje pro
                smysluplnou adaptaci na AI.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-4">
                <Link href="/manual" target="_blank">
                  <Button theme="primary" size="base">
                    Stáhnout manuál pro knihovny{" "}
                    <IconDownload className="w-5 h-5 mt-0.5 ml-2" />
                  </Button>
                </Link>
                <TypeformButton id="ZkIhUqLK">
                  <Button theme="gray" size="base">
                    Odebírat novinky
                  </Button>
                </TypeformButton>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
