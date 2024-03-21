"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useReducer,
  useState,
} from "react";
import { Question, questions, TrueFalse } from "@/framework";

export type DiagnosisFormContextType = {
  started: boolean;
  questions: Question[];
  questionsDispatch: Dispatch<Action>;
  setStarted: Dispatch<SetStateAction<boolean>>;
};

export const DiagnosisFormContext =
  createContext<DiagnosisFormContextType | null>(null);

export function useDiagnosisForm() {
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
  const [data, dispatch] = useReducer(questionsReducer, questions);
  const [started, setStarted] = useState(
    process.env.NODE_ENV === "development"
  );

  return (
    <DiagnosisFormContext.Provider
      value={{
        started,
        questions: data,
        questionsDispatch: dispatch,
        setStarted,
      }}
    >
      {children}
    </DiagnosisFormContext.Provider>
  );
}

export enum ActionKind {
  TrueFalseAnswer = "TrueFalseAnswer",
}

export interface Action {
  type: ActionKind;
  payload: {
    qi: number;
    answer: boolean | null;
  };
}

function questionsReducer(questions: Question[], action: Action) {
  switch (action.type) {
    case "TrueFalseAnswer": {
      return questions.map((q, qi) => {
        if (qi === action.payload.qi) {
          return {
            ...q,
            answer: action.payload.answer as boolean,
          } as TrueFalse;
        } else {
          return q;
        }
      });
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
