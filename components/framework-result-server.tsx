import { getSubmission } from "@/lib/get-submission";
import FrameworkResultClient from "@/components/framework-result-client";

export default async function FrameworkResultServer({ id }: { id: string }) {
  const submission = await getSubmission(id);

  return <FrameworkResultClient submission={submission} />;
}
