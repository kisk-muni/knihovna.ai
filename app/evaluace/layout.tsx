"use client";
import { FrameworkProvider } from "@/lib/hooks/use-framework";
import DebugPanel from "@/components/framework-debug-panel";

export default function DiagnostikaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FrameworkProvider>
      {children}
      <DebugPanel />
    </FrameworkProvider>
  );
}
