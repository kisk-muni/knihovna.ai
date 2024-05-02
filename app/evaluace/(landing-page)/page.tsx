import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import FrameworkStart from "@/components/framework-start";

export const metadata: Metadata = createMetadata({
  title: "Evaluační framework",
  description: `
    Zjistěte, jak je vaše knihovna připravena na rostoucí vliv AI. Získejte praktická doporučení, jak knihovnu zlepšovat.
    `,
});

export default async function EvaluationPage() {
  return <FrameworkStart />;
}
