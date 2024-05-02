import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import FrameworkResultClient from "@/components/framework-result-client";
import { getSubmission } from "@/lib/get-submission";

export const metadata: Metadata = createMetadata({
  title: "Výsledky | Evaluační framework",
  description: `
    Zjistěte, jak je vaše knihovna připravena na rostoucí vliv AI. Získejte praktická doporučení, jak knihovnu zlepšovat.
    `,
});

type Props = {
  params: { id: string };
};

export default async function ResultsPage({ params: { id } }: Props) {
  const submission = await getSubmission(id);

  return <FrameworkResultClient submission={submission} />;
}
