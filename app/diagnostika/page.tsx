import Container from "@/components/ui/container";
/* eslint-disable react/no-unescaped-entities */
import Headline from "@/components/ui/headline";
import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import BackgroundGradient from "@/components/ui/background-gradient";
import StepStart from "./step-start";

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
      <section className="bg-white pt-12 lg:pt-20 pb-0">
        <Container>
          <div className="flex flex-col gap-x-6">
            <Headline level="2" as="h2" className="max-w-md mb-10">
              Evaluační framework
            </Headline>
            <StepStart />
          </div>
        </Container>
      </section>
    </main>
  );
}
