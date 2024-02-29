import Container from "@/components/ui/container";
/* eslint-disable react/no-unescaped-entities */
import Headline from "@/components/ui/headline";
import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import TypeformButton from "@/components/ui/typeform-button";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title:
    "knihovna.ai od KISK MUNI - Mapujeme budoucnost knihoven v éře umělé inteligence",
  description:
    "Výzkumný projekt mapující potenciál knihoven v popularizaci umělé inteligence a pomoci ohroženým skupinám obyvatel.",
  ogTitle: "Mapujeme budoucnost knihoven v éře AI",
});

export default async function Home() {
  return (
    <main className="flex flex-col">
      <section id="zapojeni" className="pt-24 pb-24">
        <Container>
          <div className="flex flex-col gap-x-6">
            <Headline level="2" as="h2" className="max-w-sm mb-10">
              Jak se zapojit?
            </Headline>

            <div className="grid md:grid-cols-5 gap-x-6 gap-y-6">
              <Card
                size="md"
                className="md:col-span-2 bg-sheet text-center flex py-10 px-10 flex-col items-center justify-center"
              >
                <div className="max-w-lg mb-6 flex flex-col items-center">
                  <p className="mb-4 text-3xl font-bold text-text">
                    Sledujte projektové novinky
                  </p>
                  <p className="text-text text-lg font-semibold">
                    Odběrem novinek budete informováni o aktuálním dění
                    v projektu a nových výstupech. 
                  </p>
                </div>
                <div className="flex justify-start">
                  <TypeformButton id="ZkIhUqLK">
                    <Button theme="primary" size="base">
                      Odebírat novinky
                    </Button>
                  </TypeformButton>
                </div>
              </Card>
              <Card
                size="md"
                className="md:col-span-3 bg-primary text-center flex py-10 px-10 flex-col items-center justify-center"
              >
                <div className="max-w-lg mb-6 flex flex-col items-center">
                  <p className="w-86 mb-4 text-3xl font-bold text-white">
                    Zanechejte nám kontakt pro spolupráci
                  </p>
                  <p className="text-sheet text-lg font-semibold">
                    Pokud pracujete v knihovně nebo zastupujte knihovnu a máte
                    zájem o předběžné výstupy a užší spolupráci, zanechejte nám
                    na sebe kontakt.
                  </p>
                </div>
                <div className="flex justify-center">
                  <TypeformButton id="UzBhUVqf">
                    <Button size="base" theme="white">
                      Vyplnit kontakt
                    </Button>
                  </TypeformButton>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
