"use client";
import { formattedDate } from "@/lib/date";
import { SubmissionOld } from "@/lib/types";
import { useState, useTransition } from "react";
import { Button } from "./ui/dense-button";
import { IconLink } from "./ui/icons";
import { FrameworkShareDialog } from "./framework-share-dialog";
import { useParams } from "next/navigation";

export default function FrameworkSubmissionShare({
  submission,
}: {
  submission: SubmissionOld;
}) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const params = useParams();
  const step = !Array.isArray(params.step) ? params.step : null;

  if (step) {
    return null;
  }

  return (
    <>
      {submission?.dateLastEdited && (
        <span className="text-text-500 text-xs">
          Naposledy upraveno {formattedDate(submission?.dateLastEdited)}
        </span>
      )}
      <Button onClick={() => setShareDialogOpen(true)} size="sm">
        Získat odkaz <IconLink className="w-4 h-4 ml-1" />
      </Button>
      <FrameworkShareDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        onCopy={() => setShareDialogOpen(false)}
        submission={submission}
      />
    </>
  );
}
