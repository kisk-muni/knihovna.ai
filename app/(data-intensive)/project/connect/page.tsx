import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import SectionEngage from "@/components/section-engage";

export const metadata: Metadata = createMetadata({
  title:
    "knihovna.ai od KISK MUNI - Mapujeme budoucnost knihoven v éře umělé inteligence",
  description:
    "Výzkumný projekt mapující potenciál knihoven v popularizaci umělé inteligence a pomoci ohroženým skupinám obyvatel.",
  ogTitle: "Mapujeme budoucnost knihoven v éře AI",
});

export default async function Home() {
  return <SectionEngage />;
}
