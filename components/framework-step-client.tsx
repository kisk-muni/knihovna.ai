"use client";

import { useFramework } from "../lib/hooks/use-framework";
import { useParams, useRouter } from "next/navigation";
import classNames from "classnames";
import { Button } from "react-aria-components";
import { useEffect } from "react";
import {
  IconArrowRight,
  IconCheck,
  IconQuestionMark,
  IconX,
} from "@/components/ui/icons";
import texts from "@/app/evaluace/texts";
import { upsertFrameworkSubmission } from "@/app/actions";
import Link from "next/link";
import { SubmissionOld } from "@/lib/types";

export default function Step({
  submission,
}: {
  submission?: SubmissionOld | null;
}) {
  const router = useRouter();
  const params = useParams();
  const id = !Array.isArray(params.id) ? params.id : null;

  const step = Array.isArray(params.step) ? 1 : parseInt(params.step, 10);
  const { started, questions, secret, answer, lang, loadSubmission, getURL } =
    useFramework();

  useEffect(() => {
    if (!started && submission) {
      loadSubmission(submission.id, submission.answers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentQuestion = questions[step - 1];

  const navigate = (direction: "back" | "forward" | "results") => {
    console.log("navigate", direction);
    if (direction === "back" && step === 1) {
      router.push(getURL("landing").toString());
      return;
    }
    if (
      direction === "results" ||
      (questions.length === step && direction === "forward")
    ) {
      router.push(getURL("results").toString());
      return;
    }
    router.push(getURL(direction === "back" ? step - 1 : step + 1).toString());
  };

  const selectedTrueFalse = async (
    value: boolean | null,
    questionId: string
  ) => {
    answer(step - 1, value);
    if (!id) return;
    await upsertFrameworkSubmission(
      { id, answer: { questionId, value } },
      secret
    );
    navigate("forward");
  };

  return (
    <section className="pt-10 flex px-6 justify-center">
      <div className="flex flex-col pt-10 items-center justify-center">
        {step > 1 && (
          <Button
            className="text-text-400 hover:text-text-600 mb-8 flex items-center transition-all ease-in-out duration-150"
            onPress={() => navigate("back")}
          >
            <IconArrowRight className="h-4 w-4 shrink-0 rotate-180 mr-1" />
            {texts["previous-question"][lang]}
          </Button>
        )}
      </div>
      <div className="flex-col max-w-lg px-6">
        <div className="mb-6">
          <p className="text-text-500 font-medium text-sm mb-2">
            {texts["question"][lang][0].toUpperCase() +
              texts["question"][lang].slice(1)}{" "}
            {step} {texts["of"][lang]} {questions.length}
          </p>
          <div className="flex justify-start items-center mb-2 z-50">
            {questions.map((_question, index) => {
              return (
                <Link
                  href={getURL(index + 1)}
                  key={index}
                  className={classNames(
                    "flex-1 last:rounded-r-full transition-all ease-in-out duration-150",
                    {
                      "h-[12px] rounded-full border-[2px] border-muted":
                        index === step - 1,
                      "h-[4px]": index !== step - 1,
                      "border-l-[2px] border-muted first:border-l-0":
                        index !== step - 1 && index !== step,
                      "border-l-[0px]": index === step,
                      "bg-emerald-500 hover:bg-emerald-700":
                        !!_question.answer === true,
                      "bg-rose-500 hover:bg-rose-700":
                        _question.answer === false,
                      "bg-text-300 hover:bg-text-500":
                        _question.answer === undefined ||
                        _question.answer === null,
                      "rounded-l-full": index === 0,
                    }
                  )}
                />
              );
            })}
          </div>
        </div>
        <div className="shadow-sm rounded-xl bg-white">
          <div>
            <div className="border-neutral-200 border-t border-x rounded-t-xl">
              <div className="flex text-text p-8 flex-col gap-x-6">
                <div className="space-y-4 pb-6">
                  <h2 className="text-2xl font-medium">
                    {typeof currentQuestion.questionText === "string"
                      ? currentQuestion.questionText
                      : currentQuestion.questionText[lang]}
                  </h2>
                  {currentQuestion.examples && (
                    <p className="text-text-700">
                      {texts["eg"][lang]}{" "}
                      {typeof currentQuestion.examples === "string"
                        ? currentQuestion.examples
                        : currentQuestion.examples[lang]}
                    </p>
                  )}
                </div>
                {currentQuestion.info && (
                  <p className="text-text-700 border-t pt-6 border-neutral-200">
                    {typeof currentQuestion.info === "string"
                      ? currentQuestion.info
                      : currentQuestion.info[lang]}
                  </p>
                )}
              </div>
            </div>
            <div className="">
              {currentQuestion.type === "TrueFalse" && (
                <SelectTrueFalse
                  selected={selectedTrueFalse}
                  lang={lang}
                  questionId={currentQuestion.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex pt-10 flex-col items-center justify-center">
        <Button
          className="text-text-400 hover:text-text-600 mb-8 flex items-center transition-all ease-in-out duration-150"
          onPress={() => navigate("forward")}
        >
          {step < questions.length
            ? texts["next-question"][lang]
            : "Pokračovat"}
          <IconArrowRight className="h-4 w-4 shrink-0 ml-1" />
        </Button>
      </div>
    </section>
  );
}

function SelectTrueFalse({
  selected,
  questionId,
  lang,
}: {
  lang: "cs" | "en";
  questionId: string;
  selected: (value: boolean | null, questionId: string) => void;
}) {
  return (
    <div className="flex justify-center h-16">
      <Button
        className="grow h-full w-full py-3 px-4 text-lg rounded-bl-xl flex items-center justify-center font-medium border border-neutral-200 border-r-0 text-rose-600 hover:text-white hover:bg-rose-500 transition-all ease-in-out duration-150 [&>svg]:text-rose-500 [&>svg]:hover:text-white"
        onPress={() => selected(false, questionId)}
      >
        <IconX className="w-5 h-5 mr-3 -ml-3 text-rose-500 transition-all ease-in-out duration-150" />
        <span className="">{texts["no"][lang]}</span>
      </Button>
      <Button
        className="grow h-full w-full py-3 px-4 text-lg flex items-center justify-center font-medium border border-neutral-200 border-r-neutral-200 hover:border-r-neutral-200 text-text-500 hover:text-white hover:bg-text-600 transition-all ease-in-out duration-150"
        onPress={() => selected(null, questionId)}
      >
        <IconQuestionMark className="w-5 h-5 mr-3 -ml-3" />
        <span className="">{texts["dont-know"][lang]}</span>
      </Button>
      <Button
        className="grow h-full w-full py-3 px-4 text-lg rounded-br-xl flex items-center justify-center font-medium border border-neutral-200 border-l-0 text-emerald-600 hover:text-white hover:bg-emerald-500 transition-all ease-in-out duration-150 [&>svg]:text-emerald-500 [&>svg]:hover:text-white"
        onPress={() => selected(true, questionId)}
      >
        <IconCheck className="w-5 h-5 mr-3 -ml-30 transition-all ease-in-out duration-150" />
        <span className="">{texts["yes"][lang]}</span>
      </Button>
    </div>
  );
}
