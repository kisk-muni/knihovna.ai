import Container from "@/components/ui/container";
/* eslint-disable react/no-unescaped-entities */
import Headline from "@/components/ui/headline";
import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import BackgroundGradient from "@/components/ui/background-gradient";
import StepStart from "./step-start";
import classNames from "classnames";
import Logo from "@/components/logo";
import Card from "@/components/ui/card";
import { questions } from "@/framework";

export const metadata: Metadata = createMetadata({
  title: "Evaluační framework",
  description: `
    Zjistěte, jak je vaše knihovna připravena na rostoucí vliv AI. Získejte praktická doporučení, jak knihovnu zlepšovat.
    `,
});

const questionsLength = questions.length;

export default async function EvaluationPage() {
  const steps = [
    {
      description: "Evaluaci proveďte sami nebo s kolegy.",
    },
    {
      description: `Čeká vás ${questionsLength} otázek na 10 až 15 minut.`,
    },
    {
      description: `Otázky se týkají využívání AI v knihovnách, řešení sociálních dopadů AI i širších nároků na moderní a uživatelsky přívětivou knihovnu.`,
    },
    {
      description: `Výsledky získáte ihned po vyplnění.`,
    },
  ];
  return (
    <main className="flex flex-col">
      <BackgroundGradient.Radial />
      <section className="bg-white pt-12 lg:pt-20 pb-0">
        <Container>
          <div className="flex flex-col gap-x-6">
            <div className="flex flex-col items-center mb-12">
              <div className="mb-20 space-x-2 items-center justify-center flex">
                <Logo />
                <span className="text-text-600">·</span>
                <span className="text-text text-sm uppercase font-medium">
                  Evaluační framework
                </span>
              </div>
              <Headline
                level="1"
                as="h2"
                className="text-center max-w-screen-md"
              >
                Zjistěte, jak je vaše knihovna připravena na rostoucí vliv AI
              </Headline>
              <p className="text-text text-lg">
                Získejte praktická doporučení, jak knihovnu zlepšovat.
              </p>
            </div>
            <Card className="flex max-w-screen-sm mx-auto flex-col rounded-2xl items-center justify-between bg-white border border-neutral-200">
              <div className="gap-4 text-center p-8">
                <div className="mb-6">
                  <div className="text-xl font-bold text-text-900">
                    Připravte se a spusťte evaluaci
                  </div>
                </div>
                {steps.map((step, index) => (
                  <div key={index} className={classNames("mb-4 last:mb-0")}>
                    <div className="text-text-600 text-base">
                      {step.description}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 border-t border-neutral-200 w-full p-8 flex justify-center">
                <StepStart />
              </div>
            </Card>
          </div>
        </Container>
      </section>
    </main>
  );
}
