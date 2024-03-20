"use client";
import BackgroundGradient from "@/components/ui/background-gradient";
import { useDiagnosisForm, ActionKind } from "../use-diagnosis-form";
import { useRouter } from "next/navigation";
import { urlName } from "@/framework";
import classNames from "classnames";
import { Button } from "react-aria-components";
import Logo from "@/components/logo";
import { useEffect } from "react";
import { IconArrowRight } from "@/components/ui/icons";

function SelectTrueFalse({ selected }: { selected: (value: boolean) => void }) {
  return (
    <div className="flex space-x-6 mb-4">
      <Button
        className="items-center py-3 px-4 w-28 rounded-lg bg-red-400"
        onPress={() => selected(false)}
      >
        Ne
      </Button>
      <Button
        className="items-center py-3 px-4 w-28 rounded-lg bg-emerald-400"
        onPress={() => selected(true)}
      >
        Ano
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

  const selectedTrueFalse = (value: boolean) => {
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
      <div className="flex justify-start items-center space-x-0.5 px-0.5 py-0.5 z-50">
        {questions.map((_question, index) => {
          return (
            <div
              key={index}
              className={classNames("h-1 flex-1 rounded-full", {
                "bg-text-700 h-2": index == step - 1,
                "bg-emerald-400": !!_question.answer != false,
                "bg-red-400":
                  _question.answer != undefined && !!_question.answer == false,
                "bg-text-300": _question.answer == undefined,
              })}
            ></div>
          );
        })}
      </div>
      <div className="text-text-500 z-50 font-medium py-2 px-3 text-sm">
        <div className="flex space-x-1 py-0.5">
          <Logo />
          <span>{" · "}</span>
          <span>Evaluace knihovny</span>
          <span>{" · "}</span>
          <span>
            Otázka {step} z {questions.length}
          </span>
        </div>
      </div>
      <BackgroundGradient.Radial />
      <section className="grow flex items-center justify-center relative z-50 h-full pb-40">
        <div className="max-w-lg">
          <div>
            {step > 1 && (
              <Button
                className="text-text-400 mb-8 flex items-center"
                onPress={() => navigate("back")}
              >
                <IconArrowRight className="h-4 w-4 rotate-180 mr-1" />
                Předešlá otázka
              </Button>
            )}
          </div>
          <div className="flex text-text flex-col gap-x-6">
            <h2 className="mb-8 text-2xl font-medium">
              {currentQuestion.questionText}
            </h2>
            {currentQuestion.type === "TrueFalse" && (
              <SelectTrueFalse selected={selectedTrueFalse} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
