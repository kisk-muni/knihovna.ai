"use client";
import { DiagnosisFormContext } from "@/lib/hooks/use-diagnosis-form";
import { useState } from "react";
import questions from "@/questions";

export default function DiagnostikaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState({});
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
