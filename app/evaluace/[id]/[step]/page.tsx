import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import texts from "../../texts";
import { FrameworkServerStep } from "@/components/framework-step-server";

type Props = {
  params: { step: string; lang: string; id: string };
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

export default async function StepPage({ params: { id } }: Props) {
  return <FrameworkServerStep id={id} />;
}
