"use client";

import { QrCode } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BaseButton } from "@/src/components/atoms/button";

interface QrMemberCardModalProps {
  open: boolean;
  memberId: string;
  onOpenChange: (open: boolean) => void;
}

const QrMemberCardModal = ({
  open,
  memberId,
  onOpenChange,
}: QrMemberCardModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm text-center">
        <DialogHeader>
          <DialogTitle>Kartu Member Digital</DialogTitle>
          <DialogDescription>
            Tunjukkan QR code ini saat check-in di kasir klinik.
          </DialogDescription>
        </DialogHeader>

        <div className="my-2 p-4 rounded-2xl bg-stone-50 border border-stone-200 inline-block mx-auto">
          <QrCode className="w-44 h-44 text-slate-900 mx-auto" />
          <p className="font-mono text-xs font-bold text-slate-800 mt-2">
            {memberId}
          </p>
        </div>

        <DialogFooter>
          <BaseButton
            type="button"
            className="w-full rounded-full"
            onClick={() => onOpenChange(false)}
          >
            Selesai
          </BaseButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QrMemberCardModal;
