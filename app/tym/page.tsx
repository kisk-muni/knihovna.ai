import Card from "@/components/card";
import Button from "@/components/button";
import Headline from "@/components/headline";
import siteConfig from "@/site-config";
import { createMetadata } from "@/lib/metadata";
import TypeformButton from "../../components/typeform-button";

export const metadata = createMetadata({
  title: "Náš tým",
  description:
    "Výzkumný projekt mapující potenciál knihoven v popularizaci umělé inteligence a pomoci ohroženým skupinám obyvatel.",
});

/* eslint-disable @next/next/no-img-element */
export default function AboutPage() {
  return (
    <main className="flex flex-col">
      <div className="relative py-24 sm:pt-32 lg:pt-40 pb-0">
        <div
          className="absolute -inset-x-[calc(100%)] top-0 -bottom-[calc(50%)] -z-10 transform-gpu overflow-hidden hblur-3xl"
          aria-hidden="true"
        >
          <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-b from-[#FCF2E8] to-[#ffffff]"></div>
        </div>
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="mt-6">
            <h1 className="mt-6 text-text leading-normal text-5xl font-extrabold mb-6">
              Věříme, že knihovny budou hrát v době{" "}
              <span className="text-primary">umělé inteligence</span> důležitou
              roli.
            </h1>
            <p className="text-xl text-text mb-6">
              Hledáme potenciál knihoven v rozvoji a podpoře dospělých při
              průchodu další vlnou digitální transformace.
            </p>
            <p className="text-xl text-text mb-6">
              Jsme tým mladých lidí z katedry Informačních studií a knihovnictví
              na Filozofické fakultě Masarykovy univerzity. Spojuje nás
              zvídavost a zájem o technologické a sociální výzvy současného
              světa.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto relative max-w-3xl px-6 lg:px-8">
        <div className="mt-12 max-w-2xl">
          <Headline as="h2" level="2">
            Poznejte náš tým
          </Headline>
        </div>
        <ul
          role="list"
          className="mt-8 grid gap-x-8 gap-y-8 grid-cols-2 md:grid-cols-3 sm:gap-y-10"
        >
          {siteConfig.team
            .filter((member) => member.displayOnTeamPage == true)
            .map((member, i) => (
              <li key={i}>
                <div className="flex items-center gap-x-3">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={member.avatar}
                    alt=""
                  />
                  <div>
                    <h3 className="text-base font-semibold leading-tight tracking-tight text-text">
                      {member.name}
                    </h3>
                    <p className="text-base leading-6 text-text">
                      {member.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
        <Card className="mt-32 mb-32 md:col-span-3 bg-primary text-center flex py-10 px-10 flex-col items-center justify-center">
          <div className="max-w-lg mb-6 flex flex-col items-center">
            <p className="w-86 mb-4 text-3xl font-bold text-white">
              Chcete se s námi spojit?
            </p>
            <p className="text-sheet text-lg font-semibold">
              Těšíme se na nové možnosti spolupráce. Neváhejte se nám ozvat na
              adrese{" "}
              <span className="bg-primarydarker/40 px-1 py-0.5 rounded-md">
                kiskxai@gmail.com
              </span>{" "}
              nebo nám zanechejte svůj kontakt.
            </p>
          </div>
          <div className="flex justify-center">
            <TypeformButton id="UzBhUVqf">
              <Button invert smaller>
                Zanechat kontakt
              </Button>
            </TypeformButton>
          </div>
        </Card>
      </div>
    </main>
  );
}
