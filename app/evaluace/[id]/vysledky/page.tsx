import { Metadata } from "next";
import FrameworkResultServer from "@/components/framework-result-server";
import { createMetadata } from "@/lib/metadata";
import { Answer } from "@/app/actions";
import { FrameworkSubmission } from "@/db/schema";

export type Submission =
  | (Omit<FrameworkSubmission, "answers"> & { answers: Answer[] })
  | null;

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
  return (
    <main className="flex flex-col min-h-screen">
      <FrameworkResultServer id={id} />
    </main>
  );
}
