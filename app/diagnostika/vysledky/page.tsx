"use client";
import BackgroundGradient from "@/components/ui/background-gradient";
import { useDiagnosisForm } from "../use-diagnosis-form";
import { useRouter } from "next/navigation";
import { Question, urlName } from "@/framework";
import MyRadarChart from "@/components/radar-chart";
import { Dimension } from "@/components/radar-chart";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Button } from "react-aria-components";

export default function ResultsPage() {
  const router = useRouter();
  const { questions, started } = useDiagnosisForm();
  // wrap in useEffect
  useEffect(() => {
    if (!started) {
      router.push(`/${urlName}`);
    }
  }, [started, router]);
  const questionsByCategory = questions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = [];
    }
    acc[question.category].push(question);
    return acc;
  }, {} as { [key: string]: Question[] });

  const radarData: Dimension[] = Object.keys(questionsByCategory)
    .map((category) => {
      const questions = questionsByCategory[category];
      const total = questions.length;
      const answered = questions.filter(
        (question) =>
          question.type === "TrueFalse" &&
          question.answer !== undefined &&
          question.answer
      ).length;
      return {
        name: category,
        value: answered,
        fullMark: total,
        normalizedValue: (answered / total) * 100,
        normalizedFullMark: 100,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  // push to next step if there is one, otherwise push to next theme if there is next one or to results
  const [expanded, setExpanded] = useState<boolean[]>(
    Object.keys(questionsByCategory).map(() => false)
  );
  return (
    <main className="flex flex-col">
      <BackgroundGradient.Radial />

      <section className="relative mt-20 mb-20 flex flex-col items-center">
        <div className="max-w-screen-lg px-6 flex flex-col items-center">
          <h1 className="text-text-300 uppercase text-center text-sm font-medium mb-4 mt-4">
            Vyhodnocení
          </h1>
          <h1 className="text-text text-3xl mb-16 mt-6 font-bold">
            Vaše knihovna je na začátku
          </h1>
          <div className="grid grid-cols-2 space-x-6">
            <div className="w-auto h-auto min-h-[200px] border border-neutral-150 py-6 px-3 bg-white rounded-md">
              <MyRadarChart data={radarData} />
            </div>
            <div className="text-text mt-6">
              <p className="text-text-500 mb-4">
                Tady bude kratky souhrn výsledků a doporučení na základě testu.
              </p>
              <h3 className="text-text font-bold text-lg mb-3 mt-4">
                Zaměřte se na následující:
              </h3>
              <p className="text-text-500 mb-4">
                Kratce popsany next step, ktery jsme vyhodnotili jako
                nejdulezitejsi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-50/40 pb-12 border-t grow h-full border-neutral-200">
        <div className="max-w-screen-lg px-6 py-10 mx-auto">
          <h3 className="text-text font-semibold text-2xl mt-4 mb-8">
            Detail vyhodnocení
          </h3>
          <div className="flex text-text flex-col bg-white border border-neutral-200 shadow-sm rounded-lg">
            {Object.keys(questionsByCategory).map((category, categoryIndex) => {
              return (
                <div key={categoryIndex} className="">
                  <Button
                    onPress={() => {
                      setExpanded((prev) => {
                        const next = [...prev];
                        next[categoryIndex] = !prev[categoryIndex];
                        return next;
                      });
                    }}
                    className="text-sm w-full text-left px-4 py-4 border-b border-neutral-200 flex justify-between text-text font-semibold"
                  >
                    <span>{category}</span>
                    <span className="text-text-400 font-normal">
                      3 doporučení
                    </span>
                  </Button>
                  {expanded[categoryIndex] && (
                    <div>
                      {questionsByCategory[category].map((question, qi) => {
                        return (
                          <div
                            key={qi}
                            className="flex justify-between pr-4 pl-8 text-sm border-b last:border-b border-neutral-200 py-3"
                          >
                            <div>{question.questionText}</div>
                            {question.type == "TrueFalse" &&
                              question.answer !== undefined && (
                                <div
                                  className={classNames("w-20 text-right", {
                                    "text-emerald-600": question.answer,
                                    "text-red-600": !question.answer,
                                  })}
                                >
                                  {question.answer ? "Ano" : "Ne"}
                                </div>
                              )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
