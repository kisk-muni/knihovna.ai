"use client";
import { useDiagnosisForm } from "../use-diagnosis-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Question, categories, urlName } from "@/framework";
import MyRadarChart from "@/components/radar-chart";
import { Dimension } from "@/components/radar-chart";
import classNames from "classnames";
import { Fragment, useEffect, useState } from "react";
import { Button, Link } from "react-aria-components";
import {
  IconArrowRight,
  IconCaretRight,
  IconCheck,
  IconX,
} from "@/components/ui/icons";
import texts from "../texts";

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

export default function Result() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = (searchParams.get("lang") || "cs") as "cs" | "en";
  const { questions, started } = useDiagnosisForm();
  // wrap in useEffect
  useEffect(() => {
    if (!started) {
      router.push(`/${urlName}`);
    }
  }, [started, router]);
  const questionsByCategory = questions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = [];
    }
    acc[question.category].push(question);
    return acc;
  }, {} as { [key: string]: Question[] });

  const radarData: Dimension[] = Object.keys(questionsByCategory)
    .map((category) => {
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
        value: answered,
        fullMark: total,
        normalizedValue: (answered / total) * 100,
        normalizedFullMark: 100,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const dimensions: number[] = radarData.map((dim) => dim.normalizedValue);
  const surfaceArea = calculateRadarChartSurfaceArea(dimensions);
  const maxSurfaceArea = calculateRadarChartSurfaceArea(
    radarData.map((_dim) => 100)
  );
  const score = Math.round((surfaceArea / maxSurfaceArea) * 100);

  const getLibraryType = (score: number) => {
    if (score <= 20) {
      return {
        type: { cs: "Základní knihovna", en: "a basic library" },
        description: {
          cs: "Vaše knihovna je na začátku cesty k připravenosti na dopady AI a využití AI v knihovnách.",
          en: "Your library is at the beginning of the journey to AI readiness and AI use in libraries.",
        },
      };
    }
    if (score <= 30) {
      return {
        type: { cs: "Začínající knihovna", en: "a starting library" },
        description: {
          cs: "Vaše knihovna se rozhoupává k řešení připravenosti na AI.",
          en: "Your library is starting to address AI readiness.",
        },
      };
    }
    if (score <= 40) {
      return {
        type: { cs: "Rozvíjející se knihovna", en: "a developing library" },
        description: {
          cs: "Pracujete na tom. Vaše knihovna je na dobré cestě.",
          en: "You are working on it. Your library is on the right track.",
        },
      };
    }
    if (score <= 50) {
      return {
        type: { cs: "Moderní knihovna", en: "a modern library" },
        description: {
          cs: "Jste průkopníci. Vaše knihovna jde příkladem ostatním.",
          en: "You are pioneers. Your library sets an example for other libraries.",
        },
      };
    }
    if (score <= 70) {
      return {
        type: { cs: "Ultra moderní knihovna", en: "an ultra-modern library" },
        description: {
          cs: "Pohybujete se na hraně aktuálních trendů v knihovnictví.",
          en: "You are on the cutting edge of current library trends.",
        },
      };
    }
    return {
      type: { cs: "Knihovna budoucnosti", en: "a library of the future" },
      description: {
        cs: "Vaše knihovna je připravena čelit problémům budoucnosti.",
        en: "Your library is ready to face the challenges of the future.",
      },
    };
  };

  const libraryType = getLibraryType(score);

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
      question.answer != true &&
      question.recommendation != undefined &&
      weak.map((dim) => dim.name).includes(question.category)
  );

  console.log("negative", negativeQuestions);

  const featuredRecommendation = negativeQuestions.length
    ? negativeQuestions[0].recommendation
    : null;

  console.log("recommended", featuredRecommendation);

  return (
    <Fragment>
      <section className="relative pt-20 flex flex-col items-center bg-neutral-50">
        <div className="max-w-screen-lg w-full px-6 mb-6 flex flex-col items-center">
          <h1 className="text-text-400 uppercase text-center text-sm font-medium mb-4 mt-4">
            {texts.evaluation[lang]}
          </h1>
          <h1 className="text-text text-3xl max-w-2xl mb-6 mt-6 text-center font-bold">
            {libraryType.description[lang]}
          </h1>
          <div className="text-lg text-text mb-12">
            {texts["you-are"][lang]} {libraryType.type[lang]}
          </div>
          <div className="grid grid-cols-2 w-full bg-white border p-8 border-neutral-200 rounded-lg shadow-sm">
            <div className="w-auto h-auto min-h-[200px] border border-neutral-200 rounded-md shadow-xs py-6 px-3 ">
              <MyRadarChart data={radarData} />
            </div>
            <div className="pl-8 flex flex-col">
              <div className="mb-3">
                <div className="text-text-500 text-sm mb-1">
                  {texts["your-result"][lang]}
                </div>
                <div className="text-text font-medium text-lg mb-1.5">
                  {score} %
                </div>
              </div>
              <div className="mb-3">
                <div className="text-text-500 text-sm mb-1">
                  {texts["strengths"][lang]}
                </div>
                {
                  <ul className="text-text text-base mb-3">
                    {strong.map((dim, i) => {
                      return <li key={i}>{dim.name}</li>;
                    })}
                  </ul>
                }
              </div>
              {weak.length && (
                <div className="mb-3">
                  <div className="text-text-500 text-sm mb-1">
                    {texts["weaknesses"][lang]}
                  </div>
                  {
                    <ul className="text-text text-base">
                      {weak.sort().map((dim, i) => {
                        return <li key={i}>{dim.name}</li>;
                      })}
                    </ul>
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-neutral-50">
        <div className="max-w-screen-lg px-6 mb-12 mx-auto">
          {featuredRecommendation && (
            <div className="px-8 py-6 bg-white border border-neutral-200 rounded-md ">
              <div className="flex space-x-8">
                <div>
                  <p className="text-text-500 text-sm mb-2">
                    {texts["recommendations"][lang]}
                  </p>
                  <p className="text-text font-medium text-lg mb-1.5">
                    {typeof featuredRecommendation.name === "string"
                      ? featuredRecommendation.name
                      : featuredRecommendation.name[lang]}
                  </p>
                  <p className="text-text-500 text-base mb-3">
                    {typeof featuredRecommendation.description === "string"
                      ? featuredRecommendation.description
                      : featuredRecommendation.description[lang]}
                  </p>
                </div>
                {featuredRecommendation.link && (
                  <div className="shrink-0 flex flex-col pb-3 justify-center">
                    <Link
                      href={
                        typeof featuredRecommendation.link === "string"
                          ? featuredRecommendation.link
                          : featuredRecommendation.link[lang]
                      }
                      target="_blank"
                      className="shrink-0 flex items-center px-6 py-2 text-base bg-white border border-neutral-200 text-text-900 justify-center rounded-md mt-3 hover:bg-neutral-100 hover:text-text transition-all ease-in-out duration-300"
                    >
                      {texts["proceed-to-recommended-tool"][lang]}{" "}
                      <IconArrowRight className="h-4 w-4 ml-1 shrink-0" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-neutral-50 pb-12 border-t grow h-full border-neutral-200">
        <div className="max-w-screen-lg px-6 py-10 mx-auto">
          <h3 className="text-text font-semibold text-2xl mt-4 mb-8">
            {texts["your-answers"][lang]}
          </h3>
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
                    className="text-sm w-full text-left px-4 py-5 border-b border-neutral-200 flex justify-between text-text font-semibold"
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
