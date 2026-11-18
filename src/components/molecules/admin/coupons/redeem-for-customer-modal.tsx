"use client";

import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import debounce from "lodash/debounce";
import { AlertCircle, Loader2, Ticket } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BaseButton } from "@/src/components/atoms/button";
import { BaseInput } from "@/src/components/atoms/input";
import {
  BaseSelect,
  BaseSelectContent,
  BaseSelectItem,
  BaseSelectTrigger,
  BaseSelectValue,
} from "@/src/components/atoms/select";
import { cn } from "@/lib/utils";
import { useMembershipOptionsQuery } from "@/src/services/query/admin/coupons/membership-options";

const redeemSchema = yup.object({
  userId: yup.string().required("Please select a member"),
});

export type RedeemFormValues = yup.InferType<typeof redeemSchema>;

interface RedeemForCustomerModalProps {
  open: boolean;
  couponTitle: string;
  pointsCost: number;
  onSubmit: (values: RedeemFormValues) => void | Promise<void>;
  onOpenChange: (open: boolean) => void;
}

const triggerClass = (hasError: boolean) =>
  cn(
    "h-11 w-full rounded-lg border-[#D1D5DB] text-sm text-[#1A1A1A]",
    hasError && "border-[#DC2626] focus-visible:ring-[#DC2626]/20",
  );

const RedeemForCustomerModal = ({
  open,
  couponTitle,
  pointsCost,
  onSubmit,
  onOpenChange,
}: RedeemForCustomerModalProps) => {
  const [memberSearch, setMemberSearch] = useState("");
  const debouncedSetMemberSearch = useMemo(() => debounce(setMemberSearch, 400), []);

  const { data: memberOptions = [], isFetching: isSearchingMembers } =
    useMembershipOptionsQuery(memberSearch, open);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RedeemFormValues>({
    resolver: yupResolver(redeemSchema),
    mode: "onTouched",
    defaultValues: { userId: "" },
  });

  useEffect(() => {
    if (open) reset({ userId: "" });
  }, [open, reset]);

  const selectedUserId = watch("userId");
  const selectedMember = memberOptions.find((opt) => opt.value === selectedUserId);
  const insufficientPoints =
    !!selectedMember && selectedMember.currentPoints < pointsCost;

  const submit = async (values: RedeemFormValues) => {
    await onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !isSubmitting && onOpenChange(next)}>
      <DialogContent className="gap-0 p-0 sm:max-w-md">
        <form onSubmit={handleSubmit(submit)} noValidate>
          <DialogHeader className="flex-row items-start gap-3 p-6 pb-4 pr-12">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d6c3a5]/30 text-[#5C4A2A]">
              <Ticket aria-hidden="true" className="h-5 w-5" />
            </span>
            <div className="grid gap-1">
              <DialogTitle className="text-lg font-semibold text-[#1A1A1A]">
                Redeem for Customer
              </DialogTitle>
              <DialogDescription>
                Redeem <strong className="font-medium text-[#1A1A1A]">{couponTitle}</strong>{" "}
                ({pointsCost.toLocaleString()} pts) on behalf of a member at the counter.
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="grid gap-4 px-6 py-4">
            <div className="grid gap-1.5">
              <label htmlFor="memberSearch" className="text-sm font-medium text-[#374151]">
                Search member
              </label>
              <BaseInput
                id="memberSearch"
                placeholder="Type a member's name…"
                onChange={(e) => debouncedSetMemberSearch(e.target.value)}
                className="h-11 rounded-lg border-[#D1D5DB] text-sm text-[#1A1A1A]"
              />
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="userId" className="text-sm font-medium text-[#374151]">
                Member
                <span aria-hidden="true" className="ml-0.5 text-[#DC2626]">
                  *
                </span>
              </label>
              <Controller
                name="userId"
                control={control}
                render={({ field }) => (
                  <BaseSelect value={field.value} onValueChange={field.onChange}>
                    <BaseSelectTrigger
                      id="userId"
                      aria-invalid={!!errors.userId}
                      className={triggerClass(!!errors.userId)}
                    >
                      <BaseSelectValue
                        placeholder={isSearchingMembers ? "Searching…" : "Select member"}
                      >
                        {(value) =>
                          memberOptions.find((opt) => opt.value === value)
                            ?.label ?? "Select member"
                        }
                      </BaseSelectValue>
                    </BaseSelectTrigger>
                    <BaseSelectContent>
                      {memberOptions.map((opt) => (
                        <BaseSelectItem key={opt.value} value={opt.value}>
                          {opt.label} ({opt.currentPoints.toLocaleString()} pts)
                        </BaseSelectItem>
                      ))}
                    </BaseSelectContent>
                  </BaseSelect>
                )}
              />
              {errors.userId && (
                <p className="text-xs text-[#B91C1C]">{errors.userId.message}</p>
              )}
            </div>

            {insufficientPoints && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-3.5 py-3 text-sm text-[#B91C1C]"
              >
                <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {selectedMember?.label} only has{" "}
                  {selectedMember?.currentPoints.toLocaleString()} points —
                  not enough for this coupon.
                </span>
              </div>
            )}
          </div>

          <DialogFooter className="mx-0 mb-0 mt-2 gap-2 rounded-b-xl px-6 py-4 sm:gap-2">
            <BaseButton
              type="button"
              variant="outline"
              className="h-10 px-5"
              disabled={isSubmitting}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </BaseButton>
            <BaseButton
              type="submit"
              className="h-10 min-w-32 px-5"
              disabled={isSubmitting || insufficientPoints}
            >
              {isSubmitting ? (
                <>
                  <Loader2
                    aria-hidden="true"
                    className="h-4 w-4 motion-safe:animate-spin"
                  />
                  Redeeming…
                </>
              ) : (
                "Confirm redemption"
              )}
            </BaseButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RedeemForCustomerModal;
