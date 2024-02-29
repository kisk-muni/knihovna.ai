"use client";
import { Button } from "@/components/ui/button";
import useDiagnosisForm from "@/lib/hooks/use-diagnosis-form";
import { useRouter } from "next/navigation";

export default function StepStart() {
  const { setStarted } = useDiagnosisForm();
  const router = useRouter();
  const start = () => {
    setStarted(true);
    router.push("/diagnostika/0-0");
  };
  return (
    <>
      <Button onClick={start}>Začít</Button>
    </>
  );
}
