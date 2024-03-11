"use client";
import { Button } from "@/components/ui/button";
import { urlName } from "@/framework";
import { useDiagnosisForm } from "./use-diagnosis-form";
import { useRouter } from "next/navigation";

export default function StepStart() {
  const { setStarted } = useDiagnosisForm();
  const router = useRouter();
  const start = () => {
    setStarted(true);
    router.push(`/${urlName}/1`);
  };
  return (
    <>
      <Button onClick={start}>Začít</Button>
    </>
  );
}
