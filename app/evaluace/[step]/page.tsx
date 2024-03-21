"use client";
import BackgroundGradient from "@/components/ui/background-gradient";
import { useDiagnosisForm, ActionKind } from "../use-diagnosis-form";
import { useRouter } from "next/navigation";
import { urlName } from "@/framework";
import classNames from "classnames";
import { Button } from "react-aria-components";
import Logo from "@/components/logo";
import { useEffect } from "react";
import {
  IconArrowArcRight,
  IconArrowRight,
  IconCheck,
  IconX,
} from "@/components/ui/icons";

function SelectTrueFalse({ selected }: { selected: (value: boolean) => void }) {
  return (
    <div className="flex justify-center h-16">
      <Button
        className="grow h-full w-full py-3 px-4 text-lg rounded-bl-xl flex items-center justify-center font-medium border border-neutral-200 border-r-primary-200 hover:border-r-neutral-200 text-text-500 hover:text-white hover:bg-text-600"
        onPress={() => selected(false)}
      >
        <IconX className="w-5 h-5 mr-3 -ml-3" />
        <span className="">Ne / nevím</span>
      </Button>
      <Button
        className="grow h-full w-full py-3 px-4 text-lg rounded-br-xl flex items-center justify-center font-medium border border-primary-200 border-l-0 text-primary hover:text-white hover:bg-primary"
        onPress={() => selected(true)}
      >
        <IconCheck className="w-5 h-5 mr-3 -ml-3" />
        <span className="">Ano</span>
      </Button>
    </div>
  );
}

export default function Step({
  params: { step: stringifiedStep },
}: {
  params: { step: string };
}) {
  const router = useRouter();
  const step = parseInt(stringifiedStep, 10);
  const { started, questions, questionsDispatch } = useDiagnosisForm();
  useEffect(() => {
    if (!started || !step) {
      router.push(`/${urlName}`);
    }
  }, [started, step, router]);

  const currentQuestion = questions[step - 1];

  const navigate = (direction: "back" | "forward" | "results") => {
    if (direction === "back" && step === 1) {
      router.push(`/${urlName}`);
      return;
    }
    if (
      direction === "results" ||
      (questions.length === step && direction === "forward")
    ) {
      router.push(`/${urlName}/vysledky`);
      return;
    }
    router.push(`/${urlName}/${direction === "back" ? step - 1 : step + 1}`);
  };

  const selectedTrueFalse = (value: boolean | null) => {
    questionsDispatch({
      type: ActionKind.TrueFalseAnswer,
      payload: {
        qi: step - 1,
        answer: value,
      },
    });
    navigate("forward");
  };

  return (
    <main className="flex flex-col grow h-full">
      <div className="text-text-500 z-50 font-medium py-2 px-3 text-sm">
        <div className="flex space-x-1 py-0.5">
          <Logo />
          <span>{" · "}</span>
          <span>Evaluace knihovny</span>
        </div>
      </div>
      <section className="grow flex items-center px-6 justify-center relative z-50 h-full pb-40">
        <div className="flex items-center mt-12">
          {step > 1 && (
            <Button
              className="text-text-400 hover:text-text-300 mb-8 flex items-center"
              onPress={() => navigate("back")}
            >
              <IconArrowRight className="h-4 w-4 shrink-0 rotate-180 mr-1" />
              Předešlá otázka
            </Button>
          )}
        </div>
        <div className="max-w-lg px-6">
          <div className="mb-6">
            <div className="flex justify-start items-center mb-2 space-x-0.5 z-50">
              <span className="text-text-500 font-medium text-sm mr-2">
                Otázka {step} z {questions.length}
              </span>
              {questions.map((_question, index) => {
                return (
                  <div
                    key={index}
                    className={classNames("flex-1 last:rounded-r-full", {
                      "bg-text-700 h-[8px] rounded-full": index == step - 1,
                      "h-[3px]": index != step - 1,
                      "bg-primary-400": !!_question.answer != false,
                      "bg-text-900":
                        _question.answer != undefined &&
                        !!_question.answer == false,
                      "bg-text-300": _question.answer == undefined,
                      "rounded-l-full": index == 0,
                    })}
                  ></div>
                );
              })}
            </div>
          </div>
          <div className="shadow-sm rounded-xl">
            <div>
              <div className="border-neutral-200 border-t border-x rounded-t-xl">
                <div className="flex text-text p-8 flex-col gap-x-6">
                  <div className="space-y-4 pb-6">
                    <h2 className="text-2xl font-medium">
                      {currentQuestion.questionText}
                    </h2>
                    {currentQuestion.examples && (
                      <p className="text-text-700">
                        Např. {currentQuestion.examples}
                      </p>
                    )}
                  </div>
                  {currentQuestion.info && (
                    <p className="text-text-700 border-t pt-6 border-neutral-200">
                      {currentQuestion.info}
                    </p>
                  )}
                </div>
              </div>
              <div className="">
                {currentQuestion.type === "TrueFalse" && (
                  <SelectTrueFalse selected={selectedTrueFalse} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-12">
          <Button
            className="text-text-400 hover:text-text-300 mb-8 flex items-center"
            onPress={() => navigate("forward")}
          >
            Další otázka
            <IconArrowRight className="h-4 w-4 shrink-0 ml-1" />
          </Button>
        </div>
      </section>
    </main>
  );
}
