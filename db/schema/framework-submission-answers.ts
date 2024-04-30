import {
  pgTable,
  text,
  timestamp,
  uuid,
  json,
  index,
} from "drizzle-orm/pg-core";

export const frameworkSubmissionsAnswers = pgTable(
  "framework_submission_answers",
  {
    uuid: uuid("uuid1").primaryKey().defaultRandom(),
    submissionId: text("framework_submission_id").notNull(),
    cid: text("cid"),
    dateCreated: timestamp("date_created", { mode: "date" })
      .defaultNow()
      .notNull(),
    questionId: text("question_id").notNull(),
    data: json("data").notNull(),
  },
  (table) => {
    return {
      frameworkSubmissionAnswerIdx: index("framework_submission_answer_idx").on(
        table.submissionId,
        table.questionId,
        table.submissionId
      ),
    };
  }
);

export type FrameworkSubmissionAnswersTable =
  typeof frameworkSubmissionsAnswers;

export type FrameworkSubmissionAnswer =
  typeof frameworkSubmissionsAnswers.$inferSelect;
