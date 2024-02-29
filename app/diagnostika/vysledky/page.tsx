"use client";
import Container from "@/components/ui/container";
/* eslint-disable react/no-unescaped-entities */
import BackgroundGradient from "@/components/ui/background-gradient";
import useDiagnosisForm from "@/lib/hooks/use-diagnosis-form";
// import { Button } from "@/components/button";
import { useRouter } from "next/navigation";

export default function Step() {
  const router = useRouter();
  const { questions, answers } = useDiagnosisForm();
  // push to next step if there is one, otherwise push to next theme if there is next one or to results
  return (
    <main className="flex flex-col">
      <BackgroundGradient.Radial />
      <section className="bg-white pt-12 lg:pt-20 pb-0">
        <Container>
          <div className="flex text-text flex-col gap-x-6">
            <div className="">
              {questions.map((theme, themeIndex) => {
                return (
                  <div key={themeIndex} className="mb-6">
                    <div className="text-base text-text font-bold">
                      {theme.title}
                    </div>
                    <div>
                      {theme.questions.map((question, questionIndex) => {
                        const answerIndex =
                          themeIndex.toString() + questionIndex.toString();
                        return (
                          <div key={questionIndex}>
                            {typeof question === "string" ? question : ""}
                            {(() => {
                              if (answers[answerIndex] !== undefined)
                                return (
                                  <span className="mx-2">
                                    {answers[answerIndex] === true
                                      ? "Ano"
                                      : answers[answerIndex] === false
                                      ? "Ne"
                                      : ""}
                                  </span>
                                );
                            })()}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
