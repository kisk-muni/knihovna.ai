"use client";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

type Question =
  | string
  | {
      questionText: string;
      type: "TrueFalse" | "MultipleChoice";
    };

type Theme = {
  title: string;
  questions: Question[];
};

export type DiagnosisFormContextType = {
  started: boolean;
  questions: Theme[];
  answers: {
    [index: string]: boolean;
  };
  setStarted: Dispatch<SetStateAction<boolean>>;
  setAnswers: Dispatch<
    SetStateAction<{
      [index: string]: boolean;
    }>
  >;
};

export const DiagnosisFormContext =
  createContext<DiagnosisFormContextType | null>(null);

export default function useDiagnosisForm() {
  const result = useContext(DiagnosisFormContext);
  if (!result) {
    throw new Error();
  }
  return result;
}
