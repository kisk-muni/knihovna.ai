"use client";
import { Button } from "@/components/ui/button";
import { useFramework } from "../lib/hooks/use-framework";
import Tracker from "@/tracker";
import { IconArrowRight } from "@/components/ui/icons";
import Container from "@/components/ui/container";
/* eslint-disable react/no-unescaped-entities */
import Headline from "@/components/ui/headline";
import BackgroundGradient from "@/components/ui/background-gradient";
import classNames from "classnames";
import Card from "@/components/ui/card";
import { questions } from "@/framework";
import texts from "../app/evaluace/texts";

const questionsLength = questions.length;

export default function FrameworkStart() {
  const { init, lang } = useFramework();

  const onStart = () => {
    init();
    Tracker.send({
      name: "click",
      category: "evaluation",
      method: "button",
    });
  };

  const steps: {
    description: {
      cs: string;
      en: string;
    };
  }[] = [
    {
      description: {
        cs: "Evaluaci proveďte sami nebo s kolegy.",
        en: "Conduct the evaluation alone or with colleagues.",
      },
    },
    {
      description: {
        cs: `Čeká vás ${questionsLength} otázek na 10 až 15 minut.`,
        en: `There will be ${questionsLength} questions for 10 to 15 minutes.`,
      },
    },
    {
      description: {
        cs: `Otázky se týkají využívání AI v knihovnách, řešení sociálních dopadů AI i širších nároků na moderní a uživatelsky přívětivou knihovnu.`,
        en: `The questions relate to the use of AI in libraries, addressing the social impact of AI, and the broader requirements for a modern and user-friendly library.`,
      },
    },
    {
      description: {
        cs: `Výsledky získáte ihned po vyplnění.`,
        en: `You will get the results immediately after completion.`,
      },
    },
  ];

  return (
    <main className="flex flex-col">
      <BackgroundGradient.Radial />
      <section className="bg-white pt-12 lg:pt-20 pb-12 lg:pb-20">
        <Container>
          <div className="flex flex-col gap-x-6">
            <div className="flex flex-col items-center mb-12">
              <div className="mb-12 space-x-2 items-center justify-center flex">
                <span className="text-text-500 text-sm uppercase font-medium">
                  {texts["framework-name"][lang]}
                </span>
              </div>
              <Headline
                level="ultra"
                as="h2"
                className="text-center max-w-screen-md"
              >
                {texts["framework-title"][lang]}
              </Headline>
              <p className="text-text text-lg">
                {texts["framework-subtitle"][lang]}
              </p>
            </div>
            <Card className="flex max-w-screen-sm mx-auto flex-col rounded-2xl items-center justify-between bg-white border border-neutral-200">
              <div className="gap-4 text-center p-8">
                <div className="mb-6">
                  <div className="text-xl font-bold text-text-900">
                    {texts["prepare-yourself"][lang]}
                  </div>
                </div>
                {steps.map((step, index) => (
                  <div key={index} className={classNames("mb-4 last:mb-0")}>
                    <div className="text-text-600 text-base">
                      {typeof step.description === "string"
                        ? step.description
                        : step.description[lang]}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 border-t border-neutral-200 w-full p-8 flex justify-center">
                <Button
                  size="base"
                  onClick={onStart}
                  className="flex items-center"
                >
                  {texts["start-button"][lang]}{" "}
                  <IconArrowRight className="h-5 w-5 ml-1" />
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </section>
    </main>
  );
}
