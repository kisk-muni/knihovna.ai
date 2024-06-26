"use client";
import { useFramework } from "@/lib/hooks/use-framework";
import { Question, categories, getLibraryReadiness } from "@/framework";
import MyRadarChart from "@/components/radar-chart";
import { Dimension } from "@/components/radar-chart";
import classNames from "classnames";
import { Fragment, useEffect, useState } from "react";
import { Button } from "react-aria-components";
import { Button as DButton } from "@/components/ui/dense-button";
import {
  IconCaretRight,
  IconCheck,
  IconCheckCircleFilled,
  IconCompas,
  IconSparkle,
  IconWarningOctagon,
  IconX,
} from "@/components/ui/icons";
import texts from "@/app/evaluace/texts";
import FrameworkRecommendation from "@/components/framework-recommendation";
import Link from "next/link";
import CircularProgressBar from "./framework-circular-progress";
import { SubmissionOld } from "@/lib/types";

function calculateRadarChartSurfaceArea(dimensions: number[]): number {
  if (dimensions.length < 3) {
    throw new Error(
      "Radar chart must have at least 3 dimensions to compute surface area."
    );
  }

  let totalArea = 0;

  // Iterate through each dimension to calculate triangular segments
  for (let i = 0; i < dimensions.length; i++) {
    // Get current and next dimension indices (wrap around to 0 for last dimension)
    const currentDimension = dimensions[i];
    const nextDimension = dimensions[(i + 1) % dimensions.length];

    // Calculate area of triangular segment formed by current and next dimensions
    const area =
      0.5 *
      currentDimension *
      nextDimension *
      Math.sin((2 * Math.PI) / dimensions.length);

    totalArea += area;
  }

  return totalArea;
}

export default function FrameworkResultClient({
  submission,
}: {
  submission: SubmissionOld;
}) {
  const { questions, loadSubmission, lang, getURL, readonly } = useFramework();

  useEffect(() => {
    if (submission) {
      loadSubmission(submission.id, submission.answers);
      // console.log("loadSubmission", submission.id, submission.answers);
    }
  }, []);

  const questionsByCategory = questions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = [];
    }
    acc[question.category].push(question);
    return acc;
  }, {} as { [key: string]: Question[] });

  const radarData: Dimension[] = Object.keys(questionsByCategory).map(
    (category) => {
      const questions = questionsByCategory[category];
      const total = questions.length;
      const answered = questions.filter(
        (question) =>
          question.type === "TrueFalse" &&
          question.answer !== undefined &&
          question.answer
      ).length;
      return {
        name: categories[category].name[lang],
        normalizedValue: (answered / total) * 100,
      };
    }
  );

  const dimensions: number[] = radarData.map((dim) => dim.normalizedValue);
  const surfaceArea = calculateRadarChartSurfaceArea(dimensions);
  const maxSurfaceArea = calculateRadarChartSurfaceArea(
    radarData.map((_dim) => 100)
  );
  const score = Math.round((surfaceArea / maxSurfaceArea) * 100);

  const libraryType = getLibraryReadiness(score);

  // push to next step if there is one, otherwise push to next theme if there is next one or to results
  const [expanded, setExpanded] = useState<boolean[]>(
    Object.keys(questionsByCategory).map(() => false)
  );
  const sorted = radarData.sort(
    (a, b) => b.normalizedValue - a.normalizedValue
  );

  const full = sorted.filter((dim) => dim.normalizedValue == 100);

  const strong = full.length >= 2 ? full : sorted.slice(0, 2);
  const weak =
    strong.length != radarData.length
      ? sorted
          .slice(-(radarData.length - strong.length))
          .sort((a, b) => b.normalizedValue - a.normalizedValue)
      : [];

  console.log("weak", weak);

  const negativeQuestions = questions.filter(
    (question) =>
      question.answer != true && question.recommendation != undefined
  );

  console.log("negative", negativeQuestions);

  const featuredRecommendation = negativeQuestions.length
    ? negativeQuestions[0].recommendation
    : null;

  console.log("recommended", featuredRecommendation);

  const [currentDimension, setCurrentDimension] = useState(
    texts["recommended"][lang]
  );

  const weakNames = weak.map((dim) => dim.name);

  const recommended: { [key: string]: Question[] } = {
    [texts["recommended"][lang]]: negativeQuestions
      .filter((question) => weakNames.includes(question.category))
      // sort by question.recommendation.difficulty for following order "easy", "moderate", "difficult"
      .sort((a, b) => {
        if (a.recommendation.difficulty === "easy") return -1;
        if (b.recommendation.difficulty === "easy") return 1;
        if (a.recommendation.difficulty === "moderate") return -1;
        if (b.recommendation.difficulty === "moderate") return 1;
        return 0;
      })
      .slice(0, 3),
    //,
  };

  const questionsForRecommendation: {
    [key: string]: Question[];
  } = { ...questionsByCategory, ...recommended };

  const dimensionNameList = [
    ...[texts["recommended"][lang]],
    ...sorted.map((dimension) => dimension.name),
  ];

  return (
    <Fragment>
      <section className="relative flex py-6 flex-col items-center">
        <div className="max-w-screen-lg w-full px-6 mb-6 flex flex-col">
          <h1 className="text-text text-3xl font-semibold mb-4 mt-4">
            {texts.evaluation[lang]}
          </h1>

          <div className="mt-6 w-full  bg-white border border-neutral-200 rounded-lg shadow-sm">
            <div className="grid grid-cols-7 border-b border-neutral-200">
              <div className="flex-col col-span-3 py-6 pl-8">
                <h2 className="text-text text-xl font-medium mt-4 mb-4">
                  Celková připravenost knihovny
                </h2>
                <div className="mb-8">
                  {" "}
                  <CircularProgressBar
                    value={score}
                    condition={libraryType.signal}
                  />
                </div>
                <div className="mb-4">
                  <p className="font-medium text-sm">
                    {libraryType.condition[lang]}
                  </p>
                  <p className="text-xs text-text-500">
                    {libraryType.range[lang]}
                  </p>
                </div>
                <p className="text-text-500 text-base mt-0 mb-4">
                  {libraryType.description[lang]}
                </p>
              </div>
              <div className="flex-col col-span-4 py-2 pr-6">
                <div className="w-auto h-auto col-span-4 border-neutral-200 rounded-md shadow-xs">
                  <MyRadarChart data={radarData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted grow h-full border-neutral-10">
        <div className="max-w-screen-lg w-full px-6 mb-6 flex flex-col mx-auto">
          <h3 className="text-text font-semibold text-2xl mt-4 mb-8">
            {texts["opportunities"][lang]}
          </h3>
          <div className="flex">
            <div className="w-[220px] shrink-0 pr-4">
              <div className="mb-4 w-full flex-col border shadow-sm rounded-lg overflow-hidden text-text md:sticky top-[83px]">
                {dimensionNameList.map((name, i) => {
                  const relevant = questionsForRecommendation[name].filter(
                    (q) => !q.answer
                  ).length;
                  if (relevant == 0) return;
                  return (
                    <Button
                      key={i}
                      onPress={() => setCurrentDimension(name)}
                      className={classNames(
                        "h-10 flex flex-1 w-full justify-between shrink-0 border-b last:border-0 px-4 text-xs items-center first:rounded-t-lg last:rounded-b-lg transition-all ease-in-out duration-150 focus:outline-none",
                        {
                          "bg-neutral-100 hover:bg-neutral-200 text-text font-medium":
                            name === currentDimension,
                          "bg-white text-text-600 hover:bg-neutral-50 hover:text-text-700":
                            name !== currentDimension,
                        }
                      )}
                    >
                      <span className="flex items-center">
                        {name === texts.recommended[lang] && (
                          <IconSparkle className="w-4 h-4 mr-1" />
                        )}
                        {name}
                      </span>

                      <span
                        className={classNames(
                          "rounded-full ml-1 text-xs -mr-1 px-1",
                          {
                            "text-white bg-neutral-500":
                              name === currentDimension,
                            "text-text bg-neutral-100":
                              name !== currentDimension,
                          }
                        )}
                      >{`${relevant}`}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="">
              {questionsForRecommendation[currentDimension]
                ?.filter((question) => !question.answer)
                ?.map(({ recommendation }, i) => (
                  <FrameworkRecommendation
                    key={i}
                    recommendation={recommendation}
                    lang={lang}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted pb-12 grow h-full border-neutral-100">
        <div className="max-w-screen-lg px-6 py-6 mx-auto">
          <div className="flex items-baseline justify-between">
            <h3 className="text-text font-semibold text-2xl mt-4 mb-8">
              {texts["your-answers"][lang]}
            </h3>
            {!readonly && (
              <DButton variant="white" size="sm" asChild>
                <Link href={getURL("start")}>Upravit</Link>
              </DButton>
            )}
          </div>
          <div className="flex text-text flex-col bg-white border border-neutral-200 shadow-sm rounded-lg">
            {Object.keys(questionsByCategory).map((category, categoryIndex) => {
              const count = questionsByCategory[category].length;
              const questionsLabel =
                count === 1
                  ? texts["question"][lang]
                  : count < 5
                  ? texts["questions"][lang]
                  : texts["questions-no"][lang];
              return (
                <div key={categoryIndex} className="">
                  <Button
                    onPress={() => {
                      setExpanded((prev) => {
                        const next = [...prev];
                        next[categoryIndex] = !prev[categoryIndex];
                        return next;
                      });
                    }}
                    className="text-sm w-full text-left px-4 py-5 border-b border-neutral-200 flex justify-between text-text font-semibold focus:outline-none"
                  >
                    <div className="flex items-center">
                      <IconCaretRight
                        className={classNames(
                          "h-4 w-4 mr-2 transition-all transform",
                          {
                            "rotate-90": expanded[categoryIndex],
                          }
                        )}
                      />
                      <span>{categories[category].name[lang]}</span>
                    </div>
                    <span className="text-text-400 font-normal">
                      {questionsByCategory[category].length} {questionsLabel}
                    </span>
                  </Button>
                  <div className="bg-neutral-50 transition-all ease-in-out duration-300 transform">
                    {expanded[categoryIndex] && (
                      <div>
                        {questionsByCategory[category].map((question, qi) => {
                          return (
                            <div
                              key={qi}
                              className="flex justify-between pr-4 pl-10 text-sm border-b last:border-b border-neutral-200 py-3"
                            >
                              <div>
                                {typeof question.questionText === "string"
                                  ? question.questionText
                                  : question.questionText[lang]}
                              </div>
                              {/* <SelectAnswer
                                selectedKey={
                                  question.answer === undefined
                                    ? "skip"
                                    : question.answer
                                    ? "yes"
                                    : "no"
                                }
                              /> */}
                              {question.type == "TrueFalse" &&
                                question.answer !== undefined && (
                                  <div
                                    className={classNames(
                                      "shrink-0 h-full flex items-center flex-nowrap rounded-full px-2 py-1 text-xs text-right",
                                      {
                                        "bg-primary text-white":
                                          question.answer,
                                        "bg-text-700 text-white":
                                          !question.answer,
                                      }
                                    )}
                                  >
                                    {question.answer ? (
                                      <>
                                        <IconCheck className="h-3 w-3 mr-0.5 -ml-0.5" />{" "}
                                        {texts["yes"][lang]}
                                      </>
                                    ) : (
                                      <>
                                        <IconX className="h-3 w-3 mr-0.5 -ml-0.5" />{" "}
                                        {texts["no/dont-know"][lang]}
                                      </>
                                    )}
                                  </div>
                                )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Fragment>
  );
}
