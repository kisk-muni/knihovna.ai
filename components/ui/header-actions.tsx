"use client";
import * as React from "react";
import { ServerActionResult } from "@/lib/types";
import { Button } from "@/components/ui/dense-button";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { FeedbackSubmitDialog } from "@/components/feedback-submit-dialog";
import { Feedback } from "@/db/schema";

interface HeaderActionsProps {
  submitFeedback: (args: { message: string }) => ServerActionResult<Feedback>;
}

export function HeaderActions({ submitFeedback }: HeaderActionsProps) {
  const [feedbackDialogOpen, setFeedbackDialogOpen] = React.useState(false);
  const [isRemovePending, startRemoveTransition] = React.useTransition();

  return (
    <>
      <TooltipTrigger>
        <Button
          size={"sm"}
          variant={"outline"}
          className="hidden md:flex"
          disabled={isRemovePending}
          onClick={() => setFeedbackDialogOpen(true)}
        >
          <span className="hidden md:flex">Dejte nám zpětnou vazbu</span>
        </Button>
        <Tooltip>Dejte nám zpětnou vazbu</Tooltip>
      </TooltipTrigger>
      <FeedbackSubmitDialog
        submitFeedback={submitFeedback}
        open={feedbackDialogOpen}
        onOpenChange={setFeedbackDialogOpen}
        setOpen={setFeedbackDialogOpen}
      />
    </>
  );
}
