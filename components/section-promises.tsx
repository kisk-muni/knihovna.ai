import Container from "@/components/ui/container";
/* eslint-disable react/no-unescaped-entities */
import Headline from "@/components/ui/headline";
import Card from "@/components/ui/card";
import {
  FunnelIcon,
  MapIcon,
  SquaresPlusIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";

export default function SectionPromises() {
  return (
    <section className="bg-white pt-24">
      <Container>
        <div className="flex flex-col gap-x-6">
          <Headline level="2" as="h2" className="max-w-sm mb-10">
            Co od nás můžete čekat?
          </Headline>
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-6">
            <Card size="md" className="bg-sheet flex flex-col justify-start">
              <div className="rounded-full bg-white p-2 w-fit">
                <MapIcon className="w-9 h-9 text-emerald-500" />
              </div>
              <p className="mt-6 mb-3 text-lg md:text-xl font-bold text-text">
                Zmapujeme potenciály a bariéry v knihovnách.
              </p>
              <p className="text-text text-lg">Zaměříme se na tyto oblasti:</p>
              <ul className="text-lg text-text list-disc pl-6">
                <li>poskytování přístupné osvěty o AI</li>
                <li>
                  poskytování dalšího vzdělávání a programů pro rozvoj
                  kompetencí
                </li>
                <li>zapojování knihoven do sociální záchranné sítě</li>
              </ul>
            </Card>
            <Card size="md" className="bg-sheet flex flex-col justify-start">
              <div className="rounded-full bg-white p-2 w-fit">
                <SquaresPlusIcon className="w-9 h-9 text-blue-500" />
              </div>
              <p className="mt-6 text-lg md:text-xl font-bold text-text">
                Prozkoumáme, jak mohou knihovny spolupracovat s dalšími
                institucemi a službami.{" "}
              </p>
            </Card>
            <Card size="md" className="bg-sheet flex flex-col justify-start">
              <div className="rounded-full bg-white p-2 w-fit">
                <WrenchScrewdriverIcon className="w-9 h-9 text-pink-500" />
              </div>
              <div>
                <p className="mt-6 mb-3 text-lg md:text-xl font-bold text-text">
                  Navrhneme a otestujeme relevantní nástroje pro knihovníky.
                </p>
                <p className="text-text text-lg">
                  Nástroje knihovníkům poskytnou inspiraci a podporu pro další
                  rozvoj služeb, které reagují na sociální dopady AI.
                </p>
              </div>
            </Card>
            <Card size="md" className="bg-sheet flex flex-col justify-start">
              <div className="rounded-full bg-white p-2 w-fit">
                <FunnelIcon className="w-9 h-9 text-purple-500" />
              </div>
              <div>
                <p className="mt-6 mb-3 text-lg md:text-xl font-bold text-text">
                  Výstupy z výzkumu a sadu prověřených nástrojů pro vás shrneme
                  do jednoduchých manuálů.
                </p>
                <p className="text-text text-lg">
                  Předpokládanými výstupy jsou:
                </p>
                <ul className="text-lg text-text list-disc pl-6">
                  <li>manuály pro knihovníky vč. sady ověřených nástrojů</li>
                  <li>výzkumná zpráva pro partnery</li>
                  <li>
                    materiály pro koncové uživatele knihoven (např. brožura)
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
