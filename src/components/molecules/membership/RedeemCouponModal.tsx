"use client";

import { Ticket } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BaseButton } from "@/src/components/atoms/button";
import { ICoupon } from "@/src/interfaces/member/membership";

interface RedeemCouponModalProps {
  coupon: ICoupon | null;
  currentPoints: number;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
}

const RedeemCouponModal = ({
  coupon,
  currentPoints,
  onConfirm,
  onOpenChange,
}: RedeemCouponModalProps) => {
  return (
    <Dialog open={!!coupon} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {coupon && (
          <>
            <DialogHeader>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#B88E39] flex items-center justify-center mx-auto mb-2">
                <Ticket className="w-6 h-6" />
              </div>
              <DialogTitle className="text-center">
                Konfirmasi Penukaran Kupon
              </DialogTitle>
              <DialogDescription className="text-center">
                Anda akan menukarkan poin reward untuk kupon berikut. Pastikan
                pilihan Anda sudah tepat.
              </DialogDescription>
            </DialogHeader>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Kupon:</span>
                <span className="font-bold text-slate-900 text-right">
                  {coupon.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">
                  Biaya Penukaran:
                </span>
                <span className="font-bold text-[#B88E39]">
                  {coupon.pointsCost} Pts
                </span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-2">
                <span className="text-slate-400 font-medium">
                  Sisa Poin Setelah Klaim:
                </span>
                <span className="font-bold text-slate-900">
                  {currentPoints - coupon.pointsCost} Pts
                </span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Masa berlaku: {coupon.expiryDays}
              </p>
            </div>

            <DialogFooter className="gap-2 sm:gap-2">
              <BaseButton
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => onOpenChange(false)}
              >
                Batal
              </BaseButton>
              <BaseButton
                type="button"
                className="rounded-full"
                onClick={onConfirm}
              >
                Ya, Tukarkan Sekarang
              </BaseButton>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RedeemCouponModal;
