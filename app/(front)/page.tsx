import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import BackgroundGradient from "@/components/ui/background-gradient";
import SectionVision from "@/components/section-vision";
import SectionNews from "@/components/section-news";
import SectionHero from "@/components/section-hero";
import SectionPromises from "@/components/section-promises";
import SectionEngage from "@/components/section-engage";
import SectionAffiliation from "@/components/section-affiliation";
import SectionExploreProject from "@/components/section-explore-project";

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
      <BackgroundGradient.Radial />
      <SectionHero />
      <SectionNews />
      <SectionVision />
      <SectionPromises />
      {/*       <SectionExploreProject /> */}
      <SectionEngage />
      <SectionAffiliation />
    </main>
  );
}
