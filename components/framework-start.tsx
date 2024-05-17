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
        cs: `Čeká vás ${questionsLength} otázek na 10 až 15 minut.`,
        en: `There will be ${questionsLength} questions for 10 to 15 minutes.`,
      },
    },
    {
      description: {
        cs: `Cílem frameworku je pomoci vám vyhodnotit, jak je vaše knihovna připravena na sociální dopady umělé inteligence a  změny na trhu práce a zaměstnanost obyvatel.`,
        en: `The goal of the framework is to help you evaluate how your library is prepared for the social impacts of artificial intelligence and changes in the labor market and employment of residents.`,
      },
    },
    {
      description: {
        cs: "Na základě odpovědí nabídne framework sadu konkrétních doporučení a příkladů, jak se na tyto změny adaptovat a rozvíjet nabídku svých služeb",
        en: "Based on the answers, the framework will offer a set of specific recommendations and examples of how to adapt to these changes and develop the offer of your services",
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
              <div className="space-x-2 items-center justify-center flex">
                <span className="uppercase mb-4 text-base text-primary font-bold tracking-wider rounded-full px-4 py-2">
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
