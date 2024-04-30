import Step from "@/components/framework-step-client";
import { getSubmission } from "@/lib/get-submission";

export async function FrameworkServerStep({ id }: { id: string }) {
  const submission = (await getSubmission(id)) || null;

  console.log("submission", submission);

  return <Step submission={submission} />;
}
