"use client";
import BackgroundGradient from "@/components/ui/background-gradient";
import { useDiagnosisForm } from "../use-diagnosis-form";
import { useRouter } from "next/navigation";
import { Question, urlName } from "@/framework";
import MyRadarChart from "@/components/radar-chart";
import { Dimension } from "@/components/radar-chart";
import classNames from "classnames";
import { useEffect } from "react";

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
  return (
    <main className="flex flex-col pb-12">
      <BackgroundGradient.Radial />
      <section className="relative mt-20 flex flex-col items-center">
        <h1 className="text-text-300 uppercase text-center text-sm font-medium mb-4 mt-4">
          Vyhodnocení
        </h1>
        <h1 className="text-text text-3xl mb-16 mt-6 font-bold">
          Vaše knihovna je na začátku
        </h1>
        <div className="grid grid-cols-2 px-6 max-w-screen-lg">
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
          <div className="w-auto h-auto min-h-[200px]">
            <MyRadarChart data={radarData} />
          </div>
        </div>
        <div className="flex text-text flex-col max-w-2xl mx-auto bg-white shadow-xl p-6 border border-neutral-150 rounded-lg mt-20 gap-x-6">
          <h3 className="text-text font-bold text-xl mb-4">Další doporučení</h3>
          <p className="text-text-500 mb-4">
            Tady bude vypis odpovedi, pokud odpovedeli Ne zobrazi se doporuceny
            material s doprovodnym textem.
          </p>
          {Object.keys(questionsByCategory).map((category, categoryIndex) => {
            return (
              <div key={categoryIndex} className="mb-6">
                <div className="text-base text-text font-bold mb-3">
                  {category}
                </div>
                <div>
                  {questionsByCategory[category].map((question, qi) => {
                    return (
                      <div key={qi} className="flex justify-between mb-4">
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
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
