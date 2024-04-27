"use client";
import Step from "@/components/framework-step-client";
import { Suspense } from "react";
import { useFramework } from "@/app/evaluace/use-framework";
import { FrameworkServerStep } from "./framework-step-server";

export default function FrameworkInit({
  id,
}: {
  id: string;
  clientChildren?: React.ReactNode;
  serverChildren?: React.ReactNode;
  loadingChildren?: React.ReactNode;
}) {
  const { started } = useFramework();
  if (started) {
  }
  return (
    <Suspense fallback={<p className="text-text">Loading</p>}>
      <FrameworkServerStep id={id} />
    </Suspense>
  );
}
