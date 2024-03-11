"use client";
import { DiagnosisFormProvider } from "@/app/diagnostika/use-diagnosis-form";

export default function DiagnostikaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DiagnosisFormProvider>{children}</DiagnosisFormProvider>;
}
