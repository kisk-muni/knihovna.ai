"use client";
import { DiagnosisFormContext } from "@/lib/hooks/use-diagnosis-form";
import { useState } from "react";
import questions from "@/questions";

export default function FrontLayout({
  defaultStarted = false,
  defaultAnswers = {},
  children,
}: {
  defaultStarted: boolean;
  defaultAnswers: {
    [index: string]: boolean;
  };
  children: React.ReactNode;
}) {
  const [started, setStarted] = useState(defaultStarted);
  const [answers, setAnswers] = useState(defaultAnswers);
  return (
    <DiagnosisFormContext.Provider
      value={{
        questions: questions,
        answers,
        setAnswers,
        started,
        setStarted,
      }}
    >
      <div className="grow">{children}</div>
    </DiagnosisFormContext.Provider>
  );
}
