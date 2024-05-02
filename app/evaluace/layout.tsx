"use client";
import { FrameworkProvider } from "@/lib/hooks/use-framework";

export default function FrameworkGlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FrameworkProvider>{children}</FrameworkProvider>;
}
