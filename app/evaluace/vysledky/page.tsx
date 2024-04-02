import { Metadata } from "next";
import Result from "./result";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Výsledky | Evaluační framework",
  description: `
    Zjistěte, jak je vaše knihovna připravena na rostoucí vliv AI. Získejte praktická doporučení, jak knihovnu zlepšovat.
    `,
});

export default function ResultsPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Result />
    </main>
  );
}
