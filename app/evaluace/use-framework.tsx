"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { nanoid } from "nanoid";
import { questions as defaultQuestions, Question, urlName } from "@/framework";
import { useRouter, useSearchParams } from "next/navigation";

type Id = string | null;

export type DiagnosisFormContextType = {
  started: boolean;
  id: Id;
  mode: "dev" | "prod";
  lang: "cs" | "en";
  init: () => void;
  answer: (qi: number, answer: boolean | null) => void;
  answerAll: (alswer: boolean | null | "random") => void;
  loadSubmission: (id: string, answers: { answer: boolean | null }[]) => void;
  questions: Question[];
  setStarted: Dispatch<SetStateAction<boolean>>;
};

export const DiagnosisFormContext =
  createContext<DiagnosisFormContextType | null>(null);

export function useFramework() {
  const result = useContext(DiagnosisFormContext);
  if (!result) {
    throw new Error();
  }
  return result;
}

export function DiagnosisFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [questions, setQuestions] = useState(defaultQuestions);
  const [mode, setMode] = useState<"prod" | "dev">("prod");
  const [id, setId] = useState<Id>(null);
  const [started, setStarted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = (searchParams.get("lang") || "cs") as "cs" | "en";

  useEffect(() => {
    const envOption = localStorage.getItem("env");
    if (envOption === "dev") {
      setMode("dev");
    }
  }, [setMode]);

  const init = (defaultId?: string) => {
    const id = defaultId || nanoid();
    setId(id);
    setStarted(true);
    router.push(`/${urlName}/${id}/1?lang=${lang}`);
  };

  const answer = (qi: number, answer: boolean | null) => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions[qi].answer = answer === null ? null : answer ? true : false;
      return newQuestions;
    });
  };

  const answerAll = (answer: boolean | null | "random") => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions.forEach((q) => {
        q.answer = answer === "random" ? getRandomAnswer() : answer;
      });
      return newQuestions;
    });
  };

  const loadSubmission = (
    id: string,
    answers: { answer: boolean | null }[]
  ) => {
    setId(id);
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions.forEach((q, i) => {
        q.answer = answers[i].answer;
      });
      return newQuestions;
    });
    setStarted(true);
  };

  return (
    <DiagnosisFormContext.Provider
      value={{
        id,
        lang,
        mode,
        init,
        started,
        questions,
        answer,
        answerAll,
        loadSubmission,
        setStarted,
      }}
    >
      {children}
    </DiagnosisFormContext.Provider>
  );
}

export enum ActionKind {
  TrueFalseAnswer = "TrueFalseAnswer",
  SetAll = "SetAll",
  Load = "Load",
}

export interface Action {
  type: ActionKind;
  payload:
    | {
        qi?: number;
        answer: boolean | null | "random";
      }
    | {
        answer: boolean | null;
      }[];
}

function getRandomAnswer(): boolean | null {
  const randomNum = Math.random();
  if (randomNum < 1 / 3) {
    return true;
  } else if (randomNum < 2 / 3) {
    return false;
  } else {
    return null;
  }
}

function questionsReducer(questions: Question[], action: Action) {
  switch (action.type) {
    case "TrueFalseAnswer": {
      if (Array.isArray(action.payload)) return questions;
      return questions.map((q, qi) => {
        if (
          !Array.isArray(action.payload) &&
          action.payload?.qi &&
          qi === action.payload.qi
        ) {
          return {
            ...q,
            answer: action.payload.answer as boolean,
          } as Question;
        } else {
          return q;
        }
      });
    }
    case "SetAll": {
      if (Array.isArray(action.payload)) return questions;
      return questions.map((q) => {
        if (!Array.isArray(action.payload)) {
          const isRandom = action.payload.answer === "random";
          return {
            ...q,
            answer: !isRandom
              ? (action.payload.answer as boolean)
              : getRandomAnswer(),
          } as Question;
        } else {
          return q;
        }
      });
    }
    case "Load": {
      if (!Array.isArray(action.payload)) return questions;
      return defaultQuestions.map((q, i) => {
        if (Array.isArray(action.payload)) {
          return {
            ...q,
            answer: action.payload[i].answer,
          };
        }
        return q;
      });
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
