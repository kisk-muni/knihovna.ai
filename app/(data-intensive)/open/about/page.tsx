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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import TypeformButton from "@/components/ui/typeform-button";
import Image from "next/image";
import PostCard from "@/app/(front)/blog/[slug]/post-card";
import { createMetadata } from "@/lib/metadata";
import BackgroundGradient from "@/components/ui/background-gradient";
import { getBlogPages } from "@/lib/notion/get-blog-data";

export const metadata: Metadata = createMetadata({
  title:
    "knihovna.ai od KISK MUNI - Mapujeme budoucnost knihoven v éře umělé inteligence",
  description:
    "Výzkumný projekt mapující potenciál knihoven v popularizaci umělé inteligence a pomoci ohroženým skupinám obyvatel.",
  ogTitle: "Mapujeme budoucnost knihoven v éře AI",
});

export default async function Home() {
  const posts = await getBlogPages();
  const recentPosts = posts.slice(0, 1);
  return (
    <main className="flex flex-col">
      <BackgroundGradient.Radial />
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
                  Mapujeme budoucnost knihoven v éře{" "}
                  <span className="text-text">umělé inteligence</span>.
                </h1>
                <p>
                  Knihovny podle nás sehrají důležitou roli v popularizaci AI a
                  pomoci ohroženým skupinám obyvatel. AI pro společnost nemá být
                  ohrožením ale novou příležitostí.
                </p>
                <p></p>
              </div>
              <div className="mt-10 flex items-center justify-center gap-x-4">
                <Link href="#zapojeni">
                  <Button theme="primary" size="base">
                    Jak se zapojit?
                  </Button>
                </Link>
                <Link href="/o-projektu">
                  <Button theme="gray" size="base" variant="ghost">
                    Více o projektu
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
      {recentPosts.length > 0 && (
        <section className="pt-12 lg:pt-20">
          <Container>
            <h2 className="block uppercase text-base font-semibold text-text/60 mb-4">
              Aktuálně v projektu
            </h2>
            <div className="flex flex-col md:flex-row gap-y-3 gap-x-3">
              {recentPosts.map((post, i) => (
                <PostCard primary post={post} key={i} />
              ))}
              {recentPosts.length > 1 && (
                <Link
                  href="/blog"
                  className="block flex items-stretch text-text/80 hover:text-text"
                >
                  <Button
                    theme="gray"
                    variant="ghost"
                    className="flex justify-center md:justify-between items-center gap-x-4 w-full px-0 md:px-6"
                  >
                    <div className="text-left">
                      Další <br className="hidden md:inline-block" />
                      příspěvky
                    </div>
                    <div>→</div>
                  </Button>
                </Link>
              )}
            </div>
          </Container>
        </section>
      )}
      <section className="bg-white pt-12 lg:pt-20 pb-0">
        <Container>
          <div className="flex flex-col gap-x-6">
            <Headline level="2" as="h2" className="max-w-md mb-10">
              Naší vizí je knihovna, která ...
            </Headline>
            <div className="grid md:grid-cols-3 gap-x-6 gap-y-4">
              <Card
                size="md"
                className="bg-[url('/bg-1.png')] bg-cover bg-no-repeat flex flex-col border-[1px] border-text/20 px-10 md:aspect-45/39 justify-center text-center"
              >
                <p className="text-base md:text-xl text-text font-bold">
                  Zpřístupňuje nové technologie komunitám.
                </p>
              </Card>
              <Card
                size="md"
                className="bg-[url('/bg-2.png')] bg-cover bg-no-repeat flex flex-col border-[1px] border-text/20 px-10 md:aspect-45/39 justify-center text-center"
              >
                <p className="text-base md:text-xl text-text font-bold">
                  Nabízí celoživotní vzdělávání pro široké skupiny lidí.
                </p>
              </Card>
              <Card
                size="md"
                className="bg-[url('/bg-3.png')] bg-cover bg-no-repeat flex flex-col border-[1px] border-text/20 px-10 md:aspect-45/39 justify-center text-center"
              >
                <p className="text-base md:text-xl text-text font-bold">
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
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-6">
              <Card size="md" className="bg-sheet flex flex-col justify-start">
                <div className="rounded-full bg-white p-2 w-fit">
                  <MapIcon className="w-9 h-9 text-emerald-500" />
                </div>
                <p className="mt-6 mb-3 text-lg md:text-xl font-bold text-text">
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
      <section className="pt-12 pb-24">
        <Container>
          <div className="grid grid-cols-1">
            <div className="flex flex-col items-center justify-center">
              <Headline
                level="2"
                as="h2"
                className="text-center max-w-md mb-12"
              >
                Za projektem stojí výzkumníci z Masarykovy univerzity
              </Headline>
              {/*<Link href="/tym">
                <Button smaller>Více o našem týmu</Button>
              </Link>*/}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center md:justify-end">
                <div className="bg-white p-3 md:p-0 relative md:-right-4 rounded-full w-[168px] aspect-square flex justify-center items-center shadow-[0px_5px_20px_0px_rgba(0,0,0,0.05)] z-10">
                  <Image
                    src="/backers/eu.jpg"
                    alt="Financováno Ervropskou Unií"
                    className="mt-1"
                    width={110}
                    height={110}
                  />
                </div>
                <div className="bg-[#0000DC] p-1 md:p-0 relative rounded-full w-[168px] aspect-square flex justify-center items-center shadow-[0px_5px_20px_0px_rgba(0,0,0,0.05)] z-20">
                  <Image
                    src="/backers/muni.png"
                    alt="Jsme projekt Masarykovy Univerzity"
                    className=""
                    width={150}
                    height={150}
                  />
                </div>
              </div>
              <p className="flex items-center w-full md:max-w-[380px] text-lg text-text">
                Projekt Veřejné knihovny jako místa podpory zaměstnanosti byl
                podpořen Evropskou unií v rámci Operačního programu
                <br />
                <br />
                CZ.03.03.01/00/22_021/0001969
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
