"use client";
import Container from "@/components/container";
/* eslint-disable react/no-unescaped-entities */
import { PopupButton } from "@typeform/embed-react";
import Headline from "@/components/headline";
import Card from "@/components/card";
import {
  AcademicCapIcon,
  FaceSmileIcon,
  FunnelIcon,
  LifebuoyIcon,
  MapIcon,
  SquaresPlusIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";
import Button from "@/components/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col">
      <section className="bg-primary-50 pt-8">
        <Container className="relative isolate">
          <div
            className="absolute inset-x-20 -top-10 -right-10 -z-10 transform-gpu overflow-hidden blur-3xl"
            aria-hidden="true"
          >
            <div className="relative left-[calc(50%-4rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#d29b5b] to-[#fcbf89] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
          </div>
          <div className="max-w-2xl mx-auto py-32 sm:py-32 lg:pt-24 pb-0">
            <div className="text-left">
              <div
                className={
                  "mt-6 text-primary [&>h1]:leading-normal [&>h1]:text-5xl [&>h1]:font-extrabold [&>h1]:mb-6 [&>p]:mb-6 [&>p]:text-xl [&>p]:font-normal [&>p]:leading-relaxed [&>p]:text-text"
                }
              >
                <h1>
                  Mapujeme budoucnost knihoven v éře{" "}
                  <span className="text-text">umělé inteligence</span>.
                </h1>
                <p>
                  AI promění, jak pracujeme. Podobně jako u příchodu internetu
                  nám AI připomíná, že je důležité rozvíjet svůj lidský
                  potenciál. Technologie pro nás nemá být ohrožením, ale novou
                  příležitostí.
                </p>
                <p>
                  Knihovny podle nás sehrají důležitou roli v popularizaci AI a
                  pomoci ohroženým skupinám obyvatel.
                </p>
              </div>
              <div className="mt-10 flex items-center justify-start gap-x-12">
                <Link href="#zapojeni">
                  <Button className="py-7">Jak se zapojit?</Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-white pt-24 pb-0">
        <Container>
          <div className="flex flex-col gap-x-6">
            <Headline level="2" as="h2" className="max-w-md mb-10">
              Naší vizí je knihovna, která ...
            </Headline>
            <div className="grid grid-cols-3 gap-x-6">
              <Card className="bg-[url('/bg-1.png')] flex flex-col border-[2px] border-text px-10 aspect-45/39 justify-center text-center">
                <p className="text-xl text-text font-bold">
                  Zpřístupňuje nové technologie komunitám.
                </p>
              </Card>
              <Card className="bg-[url('/bg-2.png')] flex flex-col border-[2px] border-text px-10 aspect-45/39 justify-center text-center">
                <p className="text-xl text-text font-bold">
                  Nabízí programy vzdělávání a oslovuje široké skupiny lidí.
                </p>
              </Card>
              <Card className="bg-[url('/bg-3.png')] flex flex-col border-[2px] border-text px-10 aspect-45/39 justify-center text-center">
                <p className="text-xl text-text font-bold">
                  Pomáhá jako přístupný bod sociální záchranné sítě.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-white pt-24">
        <Container>
          <div className="flex flex-col gap-x-6">
            <Headline level="2" as="h2" className="max-w-sm mb-10">
              Co od nás můžete čekat?
            </Headline>
            <div className="grid grid-cols-2 gap-x-6 gap-y-6">
              <Card className="bg-sheet flex flex-col justify-start">
                <div className="rounded-full bg-white p-2 w-fit">
                  <MapIcon className="w-9 h-9 text-emerald-500" />
                </div>
                <p className="mt-6 mb-3 text-xl font-bold text-text">
                  Zmapujeme potenciály a bariéry v knihovnách.
                </p>
                <p className="text-text text-lg">
                  Zaměříme se na tyto oblasti:
                </p>
                <ul className="text-lg text-text list-disc pl-6">
                  <li>poskytování přístupné osvěty o AI</li>
                  <li>
                    poskytování dalšího vzdělávání a programů pro rozvoj
                    kompetencí
                  </li>
                  <li>zapojování knihoven do sociální záchranné sítě</li>
                </ul>
              </Card>
              <Card className="bg-sheet flex flex-col justify-start">
                <div className="rounded-full bg-white p-2 w-fit">
                  <SquaresPlusIcon className="w-9 h-9 text-blue-500" />
                </div>
                <p className="mt-6 text-xl font-bold text-text">
                  Prozkoumáme, jak mohou knihovny spolupracovat s dalšími
                  institucemi a službami.{" "}
                </p>
              </Card>
              <Card className="bg-sheet flex flex-col justify-start">
                <div className="rounded-full bg-white p-2 w-fit">
                  <WrenchScrewdriverIcon className="w-9 h-9 text-pink-500" />
                </div>
                <div>
                  <p className="mt-6 mb-3 text-xl font-bold text-text">
                    Navrhneme a otestujeme relevantní nástroje pro knihovníky.
                  </p>
                  <p className="text-text text-lg">
                    Nástroje knihovníkům poskytnou inspiraci a podporu pro další
                    rozvoj služeb, které reagují na sociální dopady AI.
                  </p>
                </div>
              </Card>
              <Card className="bg-sheet flex flex-col justify-start">
                <div className="rounded-full bg-white p-2 w-fit">
                  <FunnelIcon className="w-9 h-9 text-purple-500" />
                </div>
                <div>
                  <p className="mt-6 mb-3 text-xl font-bold text-text">
                    Výstupy z výzkumu a sadu prověřených nástrojů pro vás
                    shrneme do jednoduchých manuálů.
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
      <section id="zapojeni" className="pt-24 pb-24">
        <Container>
          <div className="flex flex-col gap-x-6">
            <Headline level="2" as="h2" className="max-w-sm mb-10">
              Jak se zapojit?
            </Headline>

            <div className="grid grid-cols-5 gap-x-6 gap-y-6">
              <Card className="col-span-2 bg-sheet text-center flex py-10 px-10 flex-col items-center justify-center">
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
                  <PopupButton id="ZkIhUqLK">
                    <Button smaller>Odebírat novinky</Button>
                  </PopupButton>
                </div>
              </Card>
              <Card className="col-span-3 bg-primary text-center flex py-10 px-10 flex-col items-center justify-center">
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
                  <PopupButton id="UzBhUVqf">
                    <Button invert smaller>
                      Vyplnit kontakt
                    </Button>
                  </PopupButton>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/*<section>
        <Container>
          <div className="pt-24 pb-0 sm:py-32">
            <h1 className="text-2xl mb-6 font-bold tracking-tight text-gray-900 sm:text-2xl">
              Náš výzkum
            </h1>
            {[{ title: "some", description: "else" }].map((item, i) => (
              <div
                className="mt-4 border border-white p-4 bg-primary-100/60 hover:bg-primary-100/80 rounded-xl"
                key={i}
              >
                <h2 className="text-2xl font-bolder tracking-tight text-gray-900 sm:text-xl">
                  {item.title}
                </h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>*/}
    </main>
  );
}
