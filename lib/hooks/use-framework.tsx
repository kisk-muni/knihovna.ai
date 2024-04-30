"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { nanoid } from "nanoid";
import { questions as defaultQuestions, Question, urlName } from "@/framework";
import { useRouter, useSearchParams } from "next/navigation";

type Id = string | null;
type Secret = string | null;
type Destination = "landing" | "start" | number | "results";

export type FrameworkContextType = {
  started: boolean;
  id: Id;
  mode: "dev" | "prod";
  readonly: boolean;
  secret: Secret;
  lang: "cs" | "en";
  init: () => void;
  getURL: (to: Destination, options?: { includeSecret: boolean }) => URL;
  answer: (qi: number, answer: boolean | null) => void;
  answerAll: (alswer: boolean | null | "random") => void;
  loadSubmission: (id: string, answers: { answer: boolean | null }[]) => void;
  questions: Question[];
  setStarted: Dispatch<SetStateAction<boolean>>;
};

export const FrameworkContext = createContext<FrameworkContextType | null>(
  null
);

export function useFramework() {
  const result = useContext(FrameworkContext);
  if (!result) {
    throw new Error();
  }
  return result;
}

export function FrameworkProvider({ children }: { children: React.ReactNode }) {
  const [questions, setQuestions] = useState(defaultQuestions);
  const [mode, setMode] = useState<"prod" | "dev">("prod");
  const [id, setId] = useState<Id>(null);
  const [readonly, setReadonly] = useState<boolean>(true);
  const [secret, setSecret] = useState<Secret>(null);
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
    const secret = nanoid(32);
    setId(id);
    setSecret(secret);
    setReadonly(false);
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
    const s = searchParams.get("s");
    setSecret(s);
    setReadonly(s === null);
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions.forEach((q, i) => {
        q.answer = answers[i].answer;
      });
      return newQuestions;
    });
    setStarted(true);
  };

  const getURL = (
    to: Destination,
    options: {
      includeSecret: boolean;
    } = {
      includeSecret: true,
    }
  ): URL => {
    if (window) {
      const baseurl = new URL(`/${urlName}/`, window.location.origin);
      let url: URL | null = null;
      if (to === "start") url = new URL(`${id}/1`, baseurl);
      if (to === "results") url = new URL(`${id}/vysledky`, baseurl);
      if (Number.isInteger(to)) url = new URL(`${id}/${to}`, baseurl);
      if (!url) url = baseurl;
      if (lang != "cs") url.searchParams.set("lang", lang);
      if (options.includeSecret && secret) url.searchParams.set("s", secret);
      return url;
    }
    return new URL("http://localhost:3000");
  };

  return (
    <FrameworkContext.Provider
      value={{
        id,
        lang,
        mode,
        readonly,
        secret,
        init,
        getURL,
        started,
        questions,
        answer,
        answerAll,
        loadSubmission,
        setStarted,
      }}
    >
      {children}
    </FrameworkContext.Provider>
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
