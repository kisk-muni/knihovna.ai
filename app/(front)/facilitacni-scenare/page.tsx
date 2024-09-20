import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import BackgroundGradient from "@/components/ui/background-gradient";
import Section from "@/components/ui/section";
import Headline from "@/components/ui/headline";
import { Callout } from "@/components/ui/callout";
import { Button } from "@/components/ui/button";
import ContactCard from "@/components/contact-card";
import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Link from "next/link";
import { IconExternalLink } from "@/components/ui/icons";

export const metadata: Metadata = createMetadata({
  title: "Facilitační scénáře",
  description: `
  Scénáře schůzek a workshopů, které vám pomohou pokrýt nejaktuálnější témata, o kterých může vaše knihovna v souvislosti s AI diskutovat.
    `,
});

export default async function FacilitationScenariosPage() {
  return (
    <main className="flex flex-col">
      <BackgroundGradient.Radial />
      <Section
        hero
        title="Facilitační scénáře"
        className="mx-auto mt-16 pt-20 pb-16 md:pt-28 md:pb-24 text-center max-w-3xl flex flex-col justify-center items-center [&>p]:my-0 [&>p]:text-xl [&>p]:mb-4 [&>p]:text-text/80"
      >
        <Headline as="h1" level="ultra" className="text-center">
          Nastartujte <span className="text-primary-500">konverzaci o AI</span>{" "}
          mezi vašimi kolegy
        </Headline>
        <p>
          Ve spolupráci s profesionálním facilitátorem jsme pro vás navrhli
          scénáře schůzek a workshopů, které vám pomohou pokrýt nejaktuálnější
          témata, o kterých může vaše knihovna v souvislosti s AI diskutovat.
        </p>
      </Section>

      <Section
        prose
        className="pb-16 md:pb-24 [&>p]:mb-4 [&>p]:text-base pb-16 [&>p]:text-lg"
      >
        <div className="mb-10">
          <Headline as="h2" level="2" className="text-center">
            Jak to funguje?
          </Headline>
        </div>
        <p>
          Vyberete si{" "}
          <strong>scénář podle situace, která nejlépe sedí na váš tým</strong>.
          Pokud jste se o AI (nebo jiné nové technologii) ještě v týmu nebavili,
          doporučujeme začít u prvního scénáře “Sdílení obav a bariér”, který
          vám pomůže předejít případným neshodám v týmu.
        </p>
        <p>
          Scénář si{" "}
          <strong>
            otevřete, projdete a případně upravíte pro vaše potřeby
          </strong>
          . Vždy je potřeba myslet na to, že pro efektivní schůzku nebo workshop
          potřebujete kromě připraveného scénáře také dostatek času, vhodné
          prostory a případně materiály.
        </p>
        <p>
          Procesu se nemusíte obávat, vším vás ve scénáři provedeme a třeba se
          naučíte i nějaký tip k efektivnímu vedení schůzek!
        </p>
        <Callout>
          <p>
            <span className="uppercase font-light shrink-0 text-text-950">
              TIP 1:
            </span>{" "}
            Než se do toho pustíte, nezapomeňte se seznámit s principy
            facilitace - najdete je na začátku každého scénáře.
          </p>
        </Callout>
        <Callout>
          <p>
            <span className="uppercase font-light shrink-0 text-text-950">
              TIP 2:
            </span>{" "}
            Scénář ke zmapování znalostí a zkušeností týmu obsahuje zakladní
            materiály k tématice AI, scénář k vymýšlení aktivit zase tipy na
            úspěšnou praxi zavedení AI v knihovnách.
          </p>
        </Callout>
        <p>Přejeme příjemné schůzkování!</p>
      </Section>

      <Section className="pb-16 md:pb-24">
        <Headline as="h2" level="2" className="text-center">
          Čeho chcete docílit?
        </Headline>

        <div className="mt-10 mb-10 grid grid-cols-1 md:grid-cols-3 max-w-screen-xl mx-auto gap-6">
          {[
            {
              headline: "Nasdílet si obavy a bariéry ",
              listItems: [
                "Víte nebo máte podezření, že v týmu se mohou objevovat obavy a bariéry z tématu AI?",
                "Chcete ve vašem týmu otevřít první diskuzi na téma AI bezpečným způsobem a poskytnout prostor na vyjádření a odbavení pocitů z tématu?",
              ],
              downloadLink:
                "https://docs.google.com/document/d/1juIc5JU9zBQrqB7ZzC2sa1pemujjvQ8-NAaoKEBP0tg/edit?usp=drivesdk",
            },
            {
              headline: "Zmapovat znalosti a zkušenosti týmu",
              listItems: [
                "Potřebujete zjistit, co váš tým o AI skutečně ví?",
                "Chcete zjistit, jakou s ním mají členové týmu individuální zkušenost?",
                "Chcete se společně inspirovat a získat nové informace? ",
              ],
              downloadLink:
                "https://docs.google.com/document/d/1Co2XBvR2Wi91kyNiF-R0UBF4ILARulHWu8p7jumj2u0/edit?usp=drivesdk",
            },
            {
              headline: "Vymyslet společně nové aktivity",
              listItems: [
                "Chcete společně diskutovat možnosti a příležitost využití AI ve vaší knihovně?",
                "Chce zjistit, na čem by se členové týmu chtěli podílet?",
                "Chcete si ověřit, kde vůbec s AI začít?",
              ],
              downloadLink:
                "https://docs.google.com/document/d/1sZnZCGR_-955ENLq62NoMzwfEn5vIbSG2PcQOLIBBJs/edit?usp=drivesdk",
            },
          ].map(({ headline, listItems, downloadLink }, i) => (
            <div
              className="flex flex-col items-center from-[#FFC4A3] to-[#7280FF] bg-gradient-to-br p-10 rounded-2xl"
              key={i}
            >
              <Headline as="h3" level="4" className="text-center max-w-[180px]">
                {headline}
              </Headline>

              <ul className="mb-4 list-disc pl-4 text-text [&>li]:mb-2 last:[&>li]:mb-0">
                {listItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <Link href={downloadLink} target="_blank" className="mt-auto">
                <Button theme="white" className="flex items-center">
                  Otevřít scénář{" "}
                  <IconExternalLink className="w-4 h-4 ml-1.5 -mt-[2px]" />
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* <div className="max-w-screen-md mx-auto flex flex-col items-center mt-10 mb-10 text-lg text-center">
          <p>
            V případě, že se rozhodnete pokrýt{" "}
            <strong>všechny situace najednou</strong>
            (například na celodenním setkání), připravili jsme pro vás{" "}
            <strong>jednotný scénář</strong>, obsahující všechny předchozí
            části.
          </p>
          <Button className="mt-8">Stáhnout scénář všech situací</Button>
        </div> */}
      </Section>

      <Section className="pb-16 md:pb-24">
        <Headline as="h2" level="2" className="text-center">
          Časté dotazy k facilitačním scénářům
        </Headline>

        <AccordionRoot
          className="bg-neutral-100 mt-10 max-w-screen-md mx-auto rounded-xl border border-neutral-200"
          type="multiple"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Co když se necítím na facilitaci setkání?
            </AccordionTrigger>
            <AccordionContent>
              Pokud na vedení schůzky či workshopu dostatečně necítíte, nebo se
              chcete zapojit pouze jako účastníci, doporučujeme vám a) přenechat
              facilitaci kolegovi z týmu, kterého tato aktivita láká či b)
              najmout si profesionálního facilitátora. 
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Co když mě zajímá více facilitačních nebo designových metod?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Pokud by vás facilitační či designové metody zajímaly
                podrobněji, můžeme vám doporučit následující zdroje:
              </p>
              <ul className="list-disc mt-2 pb-4 pl-6 [&>li]:mb-2">
                <li>
                  <Link
                    className="text-primary-600 hover:text-primary-400"
                    href="https://kisk.phil.muni.cz/100metod"
                  >
                    100 metod
                  </Link>
                  , rozcestník metod pro odpovědný design informačních služeb
                </li>
                <li>
                  <Link
                    className="text-primary-600 hover:text-primary-400"
                    href="https://www.klimavize.cz/toolkit"
                  >
                    Toolkit metod pro strategické plánování
                  </Link>{" "}
                  od skupiny Klimavize
                </li>
                <li>
                  <Link
                    className="text-primary-600 hover:text-primary-400"
                    href="https://libdesign.kisk.cz/"
                  >
                    Libdesign
                  </Link>
                  , designové kartičky pro knihovny
                </li>
                <li>
                  <Link
                    className="text-primary-600 hover:text-primary-400"
                    href="https://www.butter.us/blog/facilitation-card-decks"
                  >
                    Facilitační kartičky
                  </Link>
                </li>
              </ul>
              <p>
                Existuje však spousta dalších zdrojů, pokud vás téma zajímá,
                určitě doporučujeme vyhledat si další informace dle vašeho zájmu
                po vlastní ose.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Co když se chci o AI první něco dozvědět jako jednotlivec?
            </AccordionTrigger>
            <AccordionContent>
              Na internetu v dnešní době existuje spousta kurzů, materiálů
              a jiných inspiračních zdrojů k AI. Za sebe můžeme doporučit např.{" "}
              <Link
                className="text-primary-600 hover:text-primary-400"
                href="https://www.elementsofai.cz/"
              >
                tento kurz
              </Link>
              .
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Co když se chci pouze inspirovat praxí z jiných knihoven?
            </AccordionTrigger>
            <AccordionContent>
              V druhém facilitačním scénáři týkajícího se vzdělávání a sdílení
              zkušení nabízíme přehled případových studií využití AI v
              knihovnách.
              <Link
                className="text-primary-600 hover:text-primary-400"
                href="https://knihovnaai.notion.site/P-klady-dobr-praxe-af3bd9a034f5424291342c508fa25520"
              >
                Zde k nim najdete zkratku.
              </Link>
              .
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </Section>

      <div className="mt-6 mb-6 px-6 lg:px-8">
        <div className="w-full max-w-screen-md mx-auto">
          <ContactCard className="mt-10" />
        </div>
      </div>
    </main>
  );
}
