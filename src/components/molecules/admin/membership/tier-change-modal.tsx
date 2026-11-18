"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ArrowLeftRight, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BaseButton } from "@/src/components/atoms/button";
import {
  BaseSelect,
  BaseSelectContent,
  BaseSelectItem,
  BaseSelectTrigger,
  BaseSelectValue,
} from "@/src/components/atoms/select";
import { cn } from "@/lib/utils";
import { ITierOption } from "@/src/interfaces/admin/membership/list";

const tierChangeSchema = yup.object({
  tierId: yup.string().required("Please select a tier"),
});

export type TierChangeValues = yup.InferType<typeof tierChangeSchema>;

interface TierChangeModalProps {
  open: boolean;
  memberName: string;
  currentTierId: string | null;
  tierOptions: ITierOption[];
  onSubmit: (values: TierChangeValues) => void | Promise<void>;
  onOpenChange: (open: boolean) => void;
}

// Manual tier override (PATCH /admin/membership/tier/:id). The API rejects
// re-selecting the member's current tier with a 400, so that option is
// disabled below rather than silently resubmitted.
const TierChangeModal = ({
  open,
  memberName,
  currentTierId,
  tierOptions,
  onSubmit,
  onOpenChange,
}: TierChangeModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TierChangeValues>({
    resolver: yupResolver(tierChangeSchema),
    mode: "onTouched",
    defaultValues: { tierId: "" },
  });

  useEffect(() => {
    if (open) reset({ tierId: "" });
  }, [open, reset]);

  const submit = async (values: TierChangeValues) => {
    await onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !isSubmitting && onOpenChange(next)}>
      <DialogContent className="gap-0 p-0 sm:max-w-md">
        <form onSubmit={handleSubmit(submit)} noValidate>
          <DialogHeader className="flex-row items-start gap-3 p-6 pb-4 pr-12">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d6c3a5]/30 text-[#5C4A2A]">
              <ArrowLeftRight aria-hidden="true" className="h-5 w-5" />
            </span>
            <div className="grid gap-1">
              <DialogTitle className="text-lg font-semibold text-[#1A1A1A]">
                Change Tier
              </DialogTitle>
              <DialogDescription>
                Manually override the tier for{" "}
                <strong className="font-medium text-[#1A1A1A]">
                  {memberName}
                </strong>
                .
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="grid gap-4 px-6 py-4">
            <div className="grid gap-1.5">
              <label htmlFor="tierId" className="text-sm font-medium text-[#374151]">
                Tier
                <span aria-hidden="true" className="ml-0.5 text-[#DC2626]">
                  *
                </span>
              </label>
              <Controller
                name="tierId"
                control={control}
                render={({ field }) => (
                  <BaseSelect value={field.value} onValueChange={field.onChange}>
                    <BaseSelectTrigger
                      id="tierId"
                      aria-invalid={!!errors.tierId}
                      className={cn(
                        "h-11 w-full rounded-lg border-[#D1D5DB] text-sm text-[#1A1A1A]",
                        errors.tierId &&
                          "border-[#DC2626] focus-visible:ring-[#DC2626]/20",
                      )}
                    >
                      <BaseSelectValue placeholder="Select tier">
                        {(value) =>
                          tierOptions.find((opt) => opt.id === value)?.name ??
                          "Select tier"
                        }
                      </BaseSelectValue>
                    </BaseSelectTrigger>
                    <BaseSelectContent>
                      {tierOptions.map((opt) => (
                        <BaseSelectItem
                          key={opt.id}
                          value={opt.id}
                          disabled={opt.id === currentTierId}
                        >
                          {opt.name}
                          {opt.id === currentTierId ? " (current)" : ""}
                        </BaseSelectItem>
                      ))}
                    </BaseSelectContent>
                  </BaseSelect>
                )}
              />
              {errors.tierId && (
                <p className="text-xs text-[#B91C1C]">{errors.tierId.message}</p>
              )}
            </div>
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
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2
                    aria-hidden="true"
                    className="h-4 w-4 motion-safe:animate-spin"
                  />
                  Saving…
                </>
              ) : (
                "Change tier"
              )}
            </BaseButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TierChangeModal;
