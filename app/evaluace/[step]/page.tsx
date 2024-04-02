import Logo from "@/components/logo";
import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import Step from "./step";

type Props = {
  params: { step: string };
  searchParams: URLSearchParams;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return createMetadata({
    title: `${params.step}. otázka | Evaluační framework`,
    description: `
        Zjistěte, jak je vaše knihovna připravena na rostoucí vliv AI. Získejte praktická doporučení, jak knihovnu zlepšovat.
        `,
    ogTitle: "Evaluační framework",
  });
}

export default function StepPage({ params: { step: stringifiedStep } }: Props) {
  return (
    <main className="flex flex-col grow h-full">
      <div className="text-text-500 z-50 font-medium py-2 px-3 text-sm">
        <div className="flex space-x-1 py-0.5">
          <Logo />
          <span>{" · "}</span>
          <span>Evaluace knihovny</span>
        </div>
      </div>
      <Step stringifiedStep={stringifiedStep} />
    </main>
  );
}
