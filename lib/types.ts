import { Answer, AnswerOld } from "@/app/actions";
import { FrameworkSubmission } from "@/db/schema";

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string;
    }
>;

export type Submission =
  | (Omit<FrameworkSubmission, "answers"> & {
      answers: Answer[];
    })
  | null;

export type SubmissionOld =
  | (Omit<FrameworkSubmission, "answers"> & {
      answers: AnswerOld[];
    })
  | null;
