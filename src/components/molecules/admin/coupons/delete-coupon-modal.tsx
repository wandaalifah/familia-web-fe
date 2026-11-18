"use client";

import { useState } from "react";
import { Loader2, TriangleAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BaseButton } from "@/src/components/atoms/button";

interface DeleteCouponModalProps {
  open: boolean;
  couponTitle: string;
  /** Times this coupon has already been redeemed; delete is blocked when > 0. */
  totalRedeemed: number;
  onConfirm: () => void | Promise<void>;
  onOpenChange: (open: boolean) => void;
}

const DeleteCouponModal = ({
  open,
  couponTitle,
  totalRedeemed,
  onConfirm,
  onOpenChange,
}: DeleteCouponModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const isBlocked = totalRedeemed > 0;

  const handleConfirm = async () => {
    if (isBlocked) return;
    setIsDeleting(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => !isDeleting && onOpenChange(next)}
    >
      <DialogContent
        role="alertdialog"
        showCloseButton={false}
        className="gap-0 p-0 sm:max-w-md"
      >
        <DialogHeader className="flex-row items-start gap-4 p-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FEF2F2] text-[#DC2626]">
            <TriangleAlert aria-hidden="true" className="h-5 w-5" />
          </span>
          <div className="grid gap-2">
            <DialogTitle className="text-lg font-semibold text-[#1A1A1A]">
              {isBlocked ? "This coupon can't be deleted" : "Delete this coupon?"}
            </DialogTitle>
            {isBlocked ? (
              <DialogDescription className="leading-relaxed">
                <strong className="font-semibold text-[#1A1A1A]">
                  {couponTitle}
                </strong>{" "}
                has already been redeemed{" "}
                <strong className="font-semibold text-[#B91C1C]">
                  {totalRedeemed.toLocaleString()}
                </strong>{" "}
                time{totalRedeemed === 1 ? "" : "s"}. Coupons with redemption
                history are kept for audit purposes and cannot be removed.
              </DialogDescription>
            ) : (
              <DialogDescription className="leading-relaxed">
                You are about to permanently delete{" "}
                <strong className="font-semibold text-[#1A1A1A]">
                  {couponTitle}
                </strong>
                .{" "}
                <strong className="font-semibold text-[#B91C1C]">
                  This action cannot be undone.
                </strong>
              </DialogDescription>
            )}
          </div>
        </DialogHeader>

        <DialogFooter className="mx-0 mb-0 gap-2 rounded-b-xl px-6 py-4 sm:gap-2">
          <BaseButton
            type="button"
            variant="outline"
            className="h-10 px-5"
            disabled={isDeleting}
            autoFocus
            onClick={() => onOpenChange(false)}
          >
            {isBlocked ? "Close" : "No, keep coupon"}
          </BaseButton>
          {!isBlocked && (
            <BaseButton
              type="button"
              disabled={isDeleting}
              onClick={handleConfirm}
              className="h-10 border-transparent bg-[#DC2626] px-5 text-white hover:bg-[#B91C1C] hover:text-white"
            >
              {isDeleting ? (
                <>
                  <Loader2
                    aria-hidden="true"
                    className="h-4 w-4 motion-safe:animate-spin"
                  />
                  Deleting…
                </>
              ) : (
                "Yes, delete"
              )}
            </BaseButton>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCouponModal;
