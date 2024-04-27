import "server-only";
import { cache } from "react";
import { getFrameworkSubmission } from "@/app/actions";
import { Submission } from "@/app/evaluace/[id]/vysledky/page";

export const preload = (id: string) => {
  void getSubmission(id);
};

export const getSubmission = cache(async (id: string) => {
  console.log("invoked getSubmission", id);
  const data = (await getFrameworkSubmission(id)) as unknown as Submission[];
  return data.length == 1 ? data[0] : null;
});
