"use client";

import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { toast } from "react-hot-toast";
import { ServerActionResult } from "@/lib/types";
import { Button } from "@/components/ui/dense-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IconSpinner } from "@/components/ui/icons";
import { Textarea } from "./ui/textarea";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { Feedback } from "@/db/schema";
import { submitFeedback } from "@/app/actions";

export function FeedbackOpenButton({}: {}) {
  const [feedbackDialogOpen, setFeedbackDialogOpen] = React.useState(false);
  const [isRemovePending, startRemoveTransition] = React.useTransition();

  return (
    <>
      <TooltipTrigger>
        <Button
          size={"sm"}
          variant={"white"}
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

interface FeedbackSubmitDialogProps extends DialogProps {
  submitFeedback: (args: { message: string }) => ServerActionResult<Feedback>;
  setOpen: (open: boolean) => void;
}

export function FeedbackSubmitDialog({
  submitFeedback,
  setOpen,
  open,
  ...props
}: FeedbackSubmitDialogProps) {
  const ref = React.useRef<HTMLTextAreaElement>(null);
  const [formInfo, setFormInfo] = React.useState<null | string>(null);
  const [isSubmitPending, startSubmitTransition] = React.useTransition();
  const [showThanks, setShowThanks] = React.useState(false);

  // on open Change, set showThanks to false if previously true
  React.useEffect(() => {
    if (!open && showThanks) {
      setShowThanks(false);
    }
  }, [open, showThanks]);

  return (
    <Dialog open={open} {...props}>
      {!showThanks && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pošlete nám zpětnou vazbu</DialogTitle>
            <DialogDescription>
              Tato zpráva bude odeslána našemu týmu pro zlepšení služby.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-1">
            <Textarea
              ref={ref}
              className="focus-visible:ring-0"
              placeholder="Vaše zpětná vazba, postřeh nebo problém s aplikací…"
            />
            {formInfo && (
              <p className="leading-normal text-destructive text-sm">
                {formInfo}
              </p>
            )}
          </div>
          <DialogFooter className="items-center">
            <Button
              disabled={isSubmitPending}
              onClick={() => {
                // @ts-ignore
                startSubmitTransition(async () => {
                  if (!ref.current?.value) {
                    setFormInfo("Zadejte prosím zpětnou vazbu");
                    return;
                  } else {
                    setFormInfo(null);
                  }

                  const result = await submitFeedback({
                    message: ref.current?.value,
                  });

                  if (result && "error" in result) {
                    toast.error(
                      result.error || "Nepodařilo se odeslat zpětnou vazbu"
                    );
                    return;
                  }
                  toast.success("Zpětná vazba odeslána");
                  setShowThanks(true);
                });
              }}
            >
              {isSubmitPending ? (
                <>
                  <IconSpinner className="mr-2 animate-spin" />
                  Odesílání...
                </>
              ) : (
                <>Odeslat</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
      {showThanks && (
        <DialogContent>
          <div className="pt-4">
            <h2 className="text-center text-lg font-semibold">Děkujeme!</h2>
            <p className="mb-3 leading-normal text-muted-foreground text-center">
              Vaši zprávu zohledníme při dalším směřování služby.
            </p>
          </div>
          <div className="flex justify-center">
            <Button onClick={() => setOpen(false)}>Zavřít</Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
