import { Recommendation as MyRecommendation } from "@/framework";
import { Link } from "react-aria-components";
import texts from "../app/evaluace/texts";
import { IconArrowRight } from "@/components/ui/icons";
import classNames from "classnames";

const types = {
  tool: { cs: "Doporučený nástroj", en: "Recommended tool" },
  "case-study": { cs: "Případová studie", en: "Case study" },
  organisation: { cs: "Organizace", en: "Organisation" },
  course: { cs: "Kurz", en: "Course" },
  article: { cs: "Článek", en: "Article" },
};

const difficulties = {
  easy: { cs: "Snadné", en: "Easy" },
  moderate: { cs: "Středně obtížné", en: "Moderate" },
  difficult: { cs: "Obtížné", en: "Obtížné" },
};

export default function FrameworkRecommendation({
  recommendation: { name, link, description, resources, difficulty },
  lang,
}: {
  recommendation: MyRecommendation;
  lang: "cs" | "en";
}) {
  return (
    <div className="bg-white border border-neutral-200 rounded-md overflow-hidden mb-8 shadow-sm">
      <div className="flex space-x-8">
        <div>
          <div className="px-8 py-6">
            {difficulty && (
              <span
                className={classNames(
                  "inline-block rounded-full px-2 py-0.5 mb-4 text-sm",
                  {
                    "bg-emerald-400": difficulty === "easy",
                    "bg-yellow-400": difficulty === "moderate",
                    "bg-red-400": difficulty === "difficult",
                  }
                )}
              >
                {difficulties[difficulty][lang]}
              </span>
            )}
            <p className="text-text font-medium text-md mb-1.5">
              {typeof name === "string" ? name : name[lang]}
            </p>
            <p className="text-text-500 text-base mb-2">
              {typeof description === "string"
                ? description
                : description[lang]}
            </p>
          </div>
          {resources && resources?.length > 0 && (
            <div className="py-4 bg-neutral-50 border-t border-neutral-150">
              {resources?.map((resource, i) => {
                const { title } = resource;
                return (
                  <div
                    key={i}
                    className="text-text flex justify-between items-center mb-3 mx-8 border border-neutral-150 shadow-sm bg-white px-6 rounded-lg py-4"
                  >
                    <div>
                      <p className="mb-1 text-text-400 text-sm">
                        {types[resource.type][lang]}
                      </p>
                      {title && (
                        <h4 className="font-medium text-lg mb-1">
                          {typeof title === "string" ? title : title[lang]}
                        </h4>
                      )}
                      {resource.description && (
                        <p className="text-text-600">
                          {typeof resource.description === "string"
                            ? resource.description
                            : resource.description[lang]}
                        </p>
                      )}
                    </div>
                    <div className="ml-6">
                      {resource.link && (
                        <Link
                          href={
                            typeof resource.link === "string"
                              ? resource.link
                              : resource.link[lang]
                          }
                          target="_blank"
                          className="shrink-0 whitespace-nowrap flex items-center px-6 py-2 text-[15px] bg-white border border-neutral-200 text-text-900 justify-center rounded-md  hover:bg-neutral-100 hover:text-text transition-all ease-in-out duration-300"
                        >
                          {resource.buttonText
                            ? typeof resource.buttonText === "string"
                              ? resource.buttonText
                              : resource.buttonText[lang]
                            : texts["getmore"][lang]}{" "}
                          <IconArrowRight className="h-4 w-4 ml-1 shrink-0" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {link && (
          <div className="shrink-0 flex flex-col pb-3 pr-8 justify-center">
            <Link
              href={typeof link === "string" ? link : link[lang]}
              target="_blank"
              className="shrink-0 flex items-center px-6 py-2 text-[15px] bg-white border border-neutral-200 text-text-900 justify-center rounded-md mt-3 hover:bg-neutral-100 hover:text-text transition-all ease-in-out duration-300"
            >
              {texts["proceed-to-recommended-tool"][lang]}{" "}
              <IconArrowRight className="h-4 w-4 ml-1 shrink-0" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}