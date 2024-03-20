"use client";
import { Button } from "@/components/ui/button";
import { urlName } from "@/framework";
import { useDiagnosisForm } from "./use-diagnosis-form";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/card";
import { IconArrowRight } from "@/components/ui/icons";

export default function StepStart() {
  const { setStarted, questions } = useDiagnosisForm();
  const router = useRouter();
  const start = () => {
    setStarted(true);
    router.push(`/${urlName}/1`);
  };
  return (
    <>
      <Button onClick={start} className="flex items-center">
        Spustit evaluaci <IconArrowRight className="h-5 w-5 ml-1" />
      </Button>
    </>
  );
}
