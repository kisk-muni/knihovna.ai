import { pgTable, text, timestamp, json } from "drizzle-orm/pg-core";

export const frameworkSubmissions = pgTable("framework_submissions", {
  id: text("id").notNull().primaryKey(),
  cid: text("cid"),
  secretHash: text("secret_hash"),
  dateCreated: timestamp("date_created", { mode: "date" }).defaultNow(),
  dateLastEdited: timestamp("date_last_edited", { mode: "date" }).defaultNow(),
  answers: json("answers"),
});

export type FrameworkSubmissionTable = typeof frameworkSubmissions;

export type FrameworkSubmission = typeof frameworkSubmissions.$inferSelect;
