"use client";

import { useCallback, useTransition } from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/dense-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IconEye, IconPencil, IconSpinner } from "@/components/ui/icons";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { useFramework } from "@/lib/hooks/use-framework";
import { SubmissionOld } from "@/lib/types";
import { Input } from "react-aria-components";

interface SubmissionShareDialogProps extends DialogProps {
  submission: SubmissionOld;
  onCopy: () => void;
}

export function FrameworkShareDialog({
  submission,
  onCopy,
  ...props
}: SubmissionShareDialogProps) {
  const { id, readonly, getURL } = useFramework();
  const { copyToClipboard } = useCopyToClipboard({ timeout: 1000 });

  const [isSharePending, startShareTransition] = useTransition();

  const copyShareLink = useCallback(
    async ({ ref, theme }: { ref: string; theme: "primary" | "neutral" }) => {
      if (typeof window !== "undefined") {
        const url = new URL(window.location.origin);
        // url.pathname = "/share/" + submission.id;
        copyToClipboard(url.toString() + ref);
        onCopy();
        toast.success("Odkaz pro sdílení zkopírován do schránky", {
          style: {
            borderRadius: "10px",
            color: "#fff",
            fontSize: "14px",
            background: theme === "primary" ? "#cc6943" : "#404040",
          },
          iconTheme: {
            primary: "white",
            secondary: "black",
          },
        });
      }
    },
    [copyToClipboard, onCopy]
  );

  if (!submission) {
    return null;
  }

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sdílení evaluace</DialogTitle>
          <DialogDescription>
            Kdokoli s URL si bude moci zobrazit výsledek vaší evaluace.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 mt-2 text-sm rounded-md">
          {!readonly && (
            <div className="text-text flex-col space-y-1">
              <label className="font-medium text-sm text-text-700 flex items-center mb-2">
                <IconPencil className="w-[18px] h-[18px] mr-1 p-0.5 rounded-full text-white bg-neutral-400" />
                Odkaz pro změny i prohlížení{" "}
              </label>
              <div className="flex space-x-2">
                <Input
                  name="share-edit-url"
                  className="px-2 flex flex-1 text-xs border text-text bg-neutral-100 rounded-md border-neutral-200"
                  value={getURL("results").toString()}
                />
                <Button
                  disabled={isSharePending}
                  size={"sm"}
                  variant={"destructive"}
                  onClick={() =>
                    copyShareLink({ ref: `evaluace/${id}/1`, theme: "neutral" })
                  }
                >
                  <>Zkopírovat</>
                </Button>
              </div>
            </div>
          )}
          <div className="text-text flex-col space-y-1">
            <label className="font-medium text-sm text-text-700 flex items-center mb-2">
              <IconEye className="w-[18px] h-[18px] mr-1 p-0.5 rounded-full text-white bg-neutral-400" />
              Odkaz pouze pro prohlížení
            </label>
            <div className="flex space-x-2">
              <Input
                name="share-edit-url"
                className="px-2 flex flex-1 text-xs border text-text bg-neutral-100 rounded-md border-neutral-200"
                value={getURL("results", { includeSecret: false }).toString()}
              />
              <Button
                size="sm"
                disabled={isSharePending}
                onClick={() =>
                  copyShareLink({
                    ref: `evaluace/${id}/vysledky`,
                    theme: "primary",
                  })
                }
              >
                <>Zkopírovat</>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
