"use client";
import { useFramework } from "../app/evaluace/use-framework";
import { useParams, useRouter } from "next/navigation";
import { urlName } from "@/framework";
import classNames from "classnames";
import { Button } from "react-aria-components";
import { upsertFrameworkSubmission } from "@/app/actions";
import { useEffect } from "react";
import {
  IconArrowRight,
  IconCheck,
  IconQuestionMark,
  IconX,
} from "@/components/ui/icons";
import Logo from "@/components/framework-logo";
import texts from "../app/evaluace/texts";
import { Submission } from "../app/evaluace/[id]/vysledky/page";

function SelectTrueFalse({
  selected,
  lang,
}: {
  lang: "cs" | "en";
  selected: (value: boolean | null) => void;
}) {
  return (
    <div className="flex justify-center h-16">
      <Button
        className="grow h-full w-full py-3 px-4 text-lg rounded-bl-xl flex items-center justify-center font-medium border border-neutral-200 border-r-transparent hover:border-r-neutral-200 text-text-500 hover:text-white hover:bg-text-600"
        onPress={() => selected(false)}
      >
        <IconX className="w-5 h-5 mr-3 -ml-3" />
        <span className="">{texts["no"][lang]}</span>
      </Button>
      <Button
        className="grow h-full w-full py-3 px-4 text-lg flex items-center justify-center font-medium border border-neutral-200 border-r-primary-200 hover:border-r-neutral-200 text-text-500 hover:text-white hover:bg-text-600"
        onPress={() => selected(null)}
      >
        <IconQuestionMark className="w-5 h-5 mr-3 -ml-3" />
        <span className="">{texts["dont-know"][lang]}</span>
      </Button>
      <Button
        className="grow h-full w-full py-3 px-4 text-lg rounded-br-xl flex items-center justify-center font-medium border border-primary-200 border-l-0 text-primary hover:text-white hover:bg-primary"
        onPress={() => selected(true)}
      >
        <IconCheck className="w-5 h-5 mr-3 -ml-3" />
        <span className="">{texts["yes"][lang]}</span>
      </Button>
    </div>
  );
}

export default function Step({ submission }: { submission?: Submission }) {
  const router = useRouter();
  const params = useParams();
  const id = !Array.isArray(params.id) ? params.id : null;

  const step = Array.isArray(params.step) ? 1 : parseInt(params.step, 10);
  const { started, questions, answer, lang, loadSubmission } = useFramework();

  const location = `/${urlName}/${params.id}`;
  const langUrl = lang !== "cs" ? `?lang=${lang}` : "";

  useEffect(() => {
    if (!started && submission) {
      loadSubmission(submission.id, submission.answers);
      console.log("loadSubmission", submission.id, submission.answers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentQuestion = questions[step - 1];

  const navigate = (direction: "back" | "forward" | "results") => {
    console.log("navigate", direction);
    if (direction === "back" && step === 1) {
      router.push(`${location}${langUrl}`);
      return;
    }
    if (
      direction === "results" ||
      (questions.length === step && direction === "forward")
    ) {
      router.push(`${location}/vysledky${langUrl}`);
      return;
    }
    router.push(
      `${location}/${direction === "back" ? step - 1 : step + 1}${langUrl}`
    );
  };

  const selectedTrueFalse = async (value: boolean | null) => {
    answer(step - 1, value);
    const answers = questions.map((q) => ({
      questionId: "some",
      questionVersion: "some",
      answer: q.answer === null ? null : q.answer ? true : false,
    }));
    if (!id) return;
    await upsertFrameworkSubmission({ id, answers });
    navigate("forward");
  };

  return (
    <main className="flex flex-col grow h-full">
      <div className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b border-neutral-200 shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
        <Logo lang={lang} />
      </div>
      <section className="grow bg-neutral-150 flex items-center px-6 justify-center relative z-50 h-full pb-40">
        <div className="flex items-center mt-12">
          {step > 1 && (
            <Button
              className="text-text-400 hover:text-text-300 mb-8 flex items-center"
              onPress={() => navigate("back")}
            >
              <IconArrowRight className="h-4 w-4 shrink-0 rotate-180 mr-1" />
              {texts["previous-question"][lang]}
            </Button>
          )}
        </div>
        <div className="max-w-lg px-6">
          <div className="mb-6">
            <div className="flex justify-start items-center mb-2 space-x-0.5 z-50">
              <span className="text-text-500 font-medium text-sm mr-2">
                {texts["question"][lang][0].toUpperCase() +
                  texts["question"][lang].slice(1)}{" "}
                {step} {texts["of"][lang]} {questions.length}
              </span>
              {questions.map((_question, index) => {
                return (
                  <div
                    key={index}
                    className={classNames("flex-1 last:rounded-r-full", {
                      "bg-text-700 h-[8px] rounded-full": index === step - 1,
                      "h-[3px]": index !== step - 1,
                      "bg-primary-400": !!_question.answer === true,
                      "bg-text-900": _question.answer === false,
                      "bg-text-300":
                        _question.answer === undefined ||
                        _question.answer === null,
                      "rounded-l-full": index === 0,
                    })}
                  ></div>
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
                  <SelectTrueFalse selected={selectedTrueFalse} lang={lang} />
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
            {texts["next-question"][lang]}
            <IconArrowRight className="h-4 w-4 shrink-0 ml-1" />
          </Button>
        </div>
      </section>
    </main>
  );
}
