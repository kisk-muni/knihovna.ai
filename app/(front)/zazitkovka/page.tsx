import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import BackgroundGradient from "@/components/ui/background-gradient";
import Section from "@/components/ui/section";
import Headline from "@/components/ui/headline";
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
import Image from "next/image";
import classNames from "classnames";

export const metadata: Metadata = createMetadata({
  title: "Zážitková hra",
  description: `
  Hra pro knihovníky otevírá téma sociálních dopadů nových technologií a umožňuje
          knihovníkům setkat se s veřejností v bezpečném a hravém prostředí. 
    `,
});

const GameButton = () => (
  <Link
    href="https://drive.google.com/drive/folders/1KCiY53Kfy03HphSDmx5U9TcTpj_s5TUw"
    target={`_blank`}
  >
    <Button>
      K zážitkové hře <IconExternalLink className="h-4 w-4 ml-2 mt-1" />
    </Button>
  </Link>
);

export default async function FacilitationScenariosPage() {
  return (
    <main className="flex flex-col">
      <BackgroundGradient.Radial />
      <Section
        hero
        title="Zážitková hra"
        className="mx-auto mt-16 pt-20 pb-18 md:pt-28 md:pb-24 text-center max-w-3xl flex flex-col justify-center items-center [&>p]:my-0 [&>p]:text-xl [&>p]:mb-4 [&>p]:text-text/80"
      >
        <Headline as="h1" level="ultra" className="text-center">
          <span className="text-primary-500">Zachráníme</span> knihovnu?
        </Headline>
        <p>
          Hra pro knihovníky i veřejnost otevírá téma sociálních dopadů nových
          technologií a umožňuje knihovníkům setkat se s veřejností v bezpečném
          a hravém prostředí. Patří mezi takzvané vážné hry - cílem totiž není
          pouze hra, ale změna hráčů samotných. 
        </p>
        <p className="font-bold pt-6">
          Přesuňte se do městečka, kde v důsledku krize zavřeli místní knihovnu.
          Podaří se jí společenství spoluobčanů znovu otevřít?
        </p>
        <Link
          href="https://drive.google.com/drive/folders/1KCiY53Kfy03HphSDmx5U9TcTpj_s5TUw"
          target={`_blank`}
        >
          <Image
            alt="Zážitková hra"
            src="/tools/zazitkovka.png"
            width={508}
            height={286}
            className="mt-10 mb-6"
          />
        </Link>
        <GameButton />
      </Section>

      <Section
        prose
        className="pb-18 md:pb-24 [&>p]:mb-4 [&>p]:text-base pb-16 [&>p]:text-lg"
      >
        <div className="mb-10">
          <Headline as="h2" level="2" className="text-center">
            K čemu zážitková hra slouží?
          </Headline>
        </div>
        <p className="font-bold">Zážitková hra “Zachráníme knihovnu?”:</p>
        <ul className="mb-10 list-disc pl-4 text-text [&>li]:mb-2 last:[&>li]:mb-0">
          <li>
            Umožňuje vzájemné setkání a naslouchání knihovníků s veřejností v
            bezpečném a hravém prostředí
          </li>
          <li>
            Tematizuje sociálních dopady nových technologií týkající se
            současnosti i blízké budoucnosti
          </li>
          <li>
            Dává knihovníkům nahlédnout knihovnu z perspektivy člověka s
            odlišnou životní zkušeností
          </li>
          <li>
            Podporuje partnerský vztah knihovny s veřejností založený na
            spolutvorbě
          </li>
          <li>
            Povzbuzuje veřejnost při aktivní tvorbě, sdílení/prosazování svých
            postojů a 
          </li>
          <li>
            Povzbuzuje veřejnost v neformálním učení o dopadech nových
            technologií
          </li>
        </ul>
        <p className="font-bold">
          Mimo tyto faktory je možné, že pro svou knihovnu získáte také: 
        </p>
        <ul className="mb-4 list-disc pl-4 text-text [&>li]:mb-2 last:[&>li]:mb-0">
          <li>Zpětnou vazbu na to, co lidé o vaší knihovně ví</li>
          <li>Zpětnou vazbu na to, jak lidé o knihovnách uvažují</li>
          <li>
            Nové vhledy, nápady a inspiraci pro rozvoj vašich služeb a aktivit
          </li>
          <li>Nové spolupráce a podporovatele</li>
        </ul>
        <div className="mt-10 mb-10">
          <Headline as="h2" level="2" className="text-center">
            Co zážitková hra není?
          </Headline>
          <ul className="mb-4 list-disc pl-4 text-text [&>li]:mb-2 last:[&>li]:mb-0">
            <li>
              Zážitková hra <strong>není školení</strong>. Nebude vám nic
              frontálně vysvětlovat, pravděpodobně nezískáte řadu nových
              explicitních znalostí a dovedností. Čeká vás více organický proces
              učení skrze budování zážitku.
            </li>
            <li>
              Zážitková hra <strong>není ideační workshop</strong>. Není místem,
              kde ze sebe budete vy či veřejnost chrlit nové nápady, co by
              knihovna měla být nebo dělat lépe.
            </li>
            <li>
              Zážitková hra <strong>není nudná</strong>, ale{" "}
              <strong>ani pouhá zábava</strong>. I když se během hry určitě
              pobavíte a uvolníte, hra sleduje praktické cíle uplatnitelné v
              reálném světě.
            </li>
          </ul>
        </div>
      </Section>

      <Section className="pb-18 md:pb-24">
        <Headline as="h2" level="2" className="text-center">
          Cílové skupiny
        </Headline>

        <div className="mt-10 mb-10 grid grid-cols-1 md:grid-cols-3 max-w-screen-xl mx-auto gap-6">
          {[
            {
              headline:
                "Nízkokvalifikovaní ovlivněni nástupem robotizace a automatizace",
              listItems: [
                "Dospělí s nižším stupněm vzdělání a kvalifikace a/nebo postrádající klíčové kompetence pro budoucí pracovní uplatnění.",
                "V životě je může znevýhodňovat obvyklá neúčast na dalším vzdělávání a nízká podpora od okolí a zaměstnavatele.",
                "Téma nových technologií obvykle nevnímají za „své”, přitom mnoho z nich pracuje v odvětvích pod přímým vlivem automatizace a robotizace (pokladní, řidič, pošťák atp.).",
              ],
            },
            {
              headline: "Digitálně zdatní ovlivněni rozvojem generativní AI",
              listItems: [
                "Dospělí s vysokými digitálními a dalšími kompetencemi, s návykem dalšího vzdělávání a seberozvoje, s vyšším kulturním kapitálem.",

                "Pracují na odvětvích, do kterých generativní AI přináší nové výzvy i nejistoty (copywriting, vývoj webu, marketing, grafika, 3D modelování atp.).",
                "Mohou pracovat jako freelanceři. Mohou pracovat (částečně) z domova a flexibilně. Oslovují je méně formální formáty učení a síťování. Udržují si přehled o technologických inovacích a nových trendech obecně.",
              ],
            },
            {
              headline:
                "Sociálně znevýhodnění ovlivněni nástupem robotizace a automatizace",
              listItems: [
                "Dospělí, které v životě znevýhodňují nerovné příležitosti z důvodu diskriminace a slabé socioekonomické zázemí.",
                "Mohou mít nižší vzdělání a negativní vztah k dalšímu učení z důvodu špatných zkušeností se vzdělávacím systémem, příp. s veřejnými institucemi obecně.",
                "Téma nových technologií obvykle nevnímají za „své”, přitom je technologický pokrok může poškodit na trhu práce (z důvodu nízkých kompetencí) i v životě (dezinformace, podvody).",
                "Mohou být zasíťováni na místní sociální nebo komunitní pracovníky.",
              ],
            },
          ].map(({ headline, listItems }, i) => (
            <div
              className="flex flex-col items-center from-[#BBFFA3] to-[#7280FF] bg-gradient-to-br p-10 rounded-2xl"
              key={i}
            >
              <Headline as="h3" level="4" className="text-center max-w-[300px]">
                {headline}
              </Headline>

              <ul className="mb-4 list-disc pl-4 text-text [&>li]:mb-2 last:[&>li]:mb-0">
                {listItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <GameButton />
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

      <Section className="pb-18 md:pb-24">
        <Headline as="h2" level="2" className="text-center">
          Důležité informace
        </Headline>

        <AccordionRoot
          className="bg-neutral-100 mt-10 max-w-screen-md mx-auto rounded-xl border border-neutral-200"
          type="multiple"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Jak si vybrat cílovou skupinu?</AccordionTrigger>
            <AccordionContent>
              Doporučujeme se zamyslet, která skupina je pro vás a vaše okolí
              nejaktuálnější. Nesklouzávejte k nejjednodušším volbám, zkuste se
              zamyslet, kde můžete pomoci nebo máte mezeru v kontaktu s cílovou
              skupinou. Pokud se vám formát zalíbí, můžete hru postupně využít
              pro více skupin.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Co budete nutně potřebovat? </AccordionTrigger>
            <AccordionContent>
              <p>
                Hra Otevíračka trvá přibližně{" "}
                <strong>tři až čtyři hodiny</strong>, počítá s{" "}
                <strong>deseti účastníky</strong>a{" "}
                <strong>jedním až dvěma facilitátory</strong>.
              </p>
              <p>
                Dále budete potřebovat <strong>materiály</strong> (vše je
                připraveno k tisku), <strong>prostory</strong> k hraní a
                <strong>organizátory</strong>, kteří pomohou hru realizovat. Vše
                najdete ve scénářích. 
              </p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </Section>
      <Section className="pb-18 md:pb-24">
        <Headline as="h2" level="2" className="text-center">
          Jak vypadá průběh hry?
        </Headline>
        <div className="mt-10 grid gap-4 grid-cols-1 md:grid-cols-[1fr,1fr,1fr] md:grid-rows-[repeat(2,1fr)]">
          {[
            {
              src: "/tools/zazitkovka/photos/circle.jpg",
              alt: "Kroužek účastníků hry",
            },
            {
              src: "/tools/zazitkovka/photos/table-setup.jpg",
              alt: "Příprava stolu pro hru",
            },
            {
              src: "/tools/zazitkovka/photos/activity.jpg",
              alt: "Diskuze účastníků hry",
            },
            {
              src: "/tools/zazitkovka/photos/circle2.jpg",
              alt: "Kroužek účastníků hry",
            },
            {
              src: "/tools/zazitkovka/photos/presentation.jpg",
              alt: "Momentka ze hry",
            },
            {
              src: "/tools/zazitkovka/photos/valmez.jpg",
              alt: "Valašské Meziříčí",
            },
          ].map((item, i) => (
            <div key={i} className={classNames("", {})}>
              <Image
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                (max-width: 1280px) 50vw,
                (max-width: 1536px) 33vw,
                25vw"
                src={item.src}
                alt={item.alt}
                className="rounded-xl"
              />
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
