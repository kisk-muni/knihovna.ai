import { FeedbackOpenButton } from "@/components/feedback-submit-dialog";
import FrameworkSubmissionShare from "./framework-submission-share";
import { getSubmission } from "@/lib/get-submission";

interface HeaderActionsProps {
  id: string;
}

export async function FrameworkHeaderActions({ id }: HeaderActionsProps) {
  const submission = await getSubmission(id);

  return (
    <>
      <div className="flex items-center space-x-4">
        <FeedbackOpenButton />
        <FrameworkSubmissionShare submission={submission} />
      </div>
    </>
  );
}
