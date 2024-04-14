import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import Step from "./step";
import texts from "../texts";

type Props = {
  params: { step: string; lang: string };
  searchParams: URLSearchParams;
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const lang = (params?.lang || "cs") as "cs" | "en";
  return createMetadata({
    title:
      params.step +
      `. ${texts["question"][lang]} | ${texts["framework-name"][lang]}`,
    description: texts["framework-seo-description"][lang],
    ogTitle: texts["framework-name"][lang],
  });
}

export default function StepPage({ params: { step: stringifiedStep } }: Props) {
  return <Step stringifiedStep={stringifiedStep} />;
}
