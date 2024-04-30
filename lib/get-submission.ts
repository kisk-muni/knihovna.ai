import "server-only";
import { cache } from "react";
import { getFrameworkSubmission } from "@/app/actions";
import { SubmissionOld } from "./types";

export const preload = (id: string) => {
  void getSubmission(id);
};

export const getSubmission = cache(
  async (id: string): Promise<SubmissionOld> => {
    console.log("invoked getSubmission", id);
    const submission = await getFrameworkSubmission(id);
    return submission;
  }
);
