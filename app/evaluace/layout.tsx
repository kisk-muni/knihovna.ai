"use client";
import { DiagnosisFormProvider } from "@/app/evaluace/use-framework";
import DebugPanel from "@/components/framework-debug-panel";

export default function DiagnostikaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DiagnosisFormProvider>
      {children}
      <DebugPanel />
    </DiagnosisFormProvider>
  );
}
