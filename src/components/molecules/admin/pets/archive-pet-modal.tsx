"use client";

import { useState } from "react";
import { Archive, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BaseButton } from "@/src/components/atoms/button";

interface ArchivePetModalProps {
  open: boolean;
  petName: string;
  onConfirm: () => void | Promise<void>;
  onOpenChange: (open: boolean) => void;
}

const ArchivePetModal = ({
  open,
  petName,
  onConfirm,
  onOpenChange,
}: ArchivePetModalProps) => {
  const [isArchiving, setIsArchiving] = useState(false);

  const handleConfirm = async () => {
    setIsArchiving(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } finally {
      setIsArchiving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => !isArchiving && onOpenChange(next)}
    >
      <DialogContent
        role="alertdialog"
        showCloseButton={false}
        className="gap-0 p-0 sm:max-w-md"
      >
        <DialogHeader className="flex-row items-start gap-4 p-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] text-[#4B5563]">
            <Archive aria-hidden="true" className="h-5 w-5" />
          </span>
          <div className="grid gap-2">
            <DialogTitle className="text-lg font-semibold text-[#1A1A1A]">
              Archive this pet?
            </DialogTitle>
            <DialogDescription className="leading-relaxed">
              <strong className="font-semibold text-[#1A1A1A]">
                {petName}
              </strong>{" "}
              will be hidden from the active pet directory. Its profile and
              medical history are kept on record, but this admin panel has no
              restore action yet — reach out to engineering if this pet needs
              to be reactivated.
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="mx-0 mb-0 gap-2 rounded-b-xl px-6 py-4 sm:gap-2">
          <BaseButton
            type="button"
            variant="outline"
            className="h-10 px-5"
            disabled={isArchiving}
            autoFocus
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </BaseButton>
          <BaseButton
            type="button"
            disabled={isArchiving}
            onClick={handleConfirm}
            className="h-10 border-transparent bg-[#4B5563] px-5 text-white hover:bg-[#374151] hover:text-white"
          >
            {isArchiving ? (
              <>
                <Loader2
                  aria-hidden="true"
                  className="h-4 w-4 motion-safe:animate-spin"
                />
                Archiving…
              </>
            ) : (
              "Yes, archive"
            )}
          </BaseButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ArchivePetModal;
