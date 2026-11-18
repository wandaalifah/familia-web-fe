"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Coins, Loader2 } from "lucide-react";
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

export interface MembershipOption {
  value: string;
  label: string;
  currentPoints: number;
}

// Admins can only grant points or make manual corrections here — "REDEEMED"
// entries are produced by the customer-facing redemption flow, not this modal.
const typeOptions = [
  { value: "EARNED", label: "Earned" },
  { value: "ADJUSTMENT", label: "Adjustment" },
] as const;

const adjustPointsSchema = yup.object({
  membershipId: yup.string().required("Please select a member"),
  type: yup
    .mixed<"EARNED" | "ADJUSTMENT">()
    .oneOf(["EARNED", "ADJUSTMENT"], "Please select a type")
    .required("Please select a type"),
  description: yup.string().trim().required("Description is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .integer("Amount must be a whole number")
    .required("Amount is required")
    .test(
      "not-zero",
      "Amount cannot be zero",
      (value) => value !== undefined && value !== 0,
    ),
  reference_id: yup.string().trim().optional().default(""),
});

export type AdjustPointsValues = yup.InferType<typeof adjustPointsSchema>;

const EMPTY_VALUES: AdjustPointsValues = {
  membershipId: "",
  type: "EARNED",
  description: "",
  amount: 0,
  reference_id: "",
};

interface AdjustPointsModalProps {
  open: boolean;
  membershipOptions: MembershipOption[];
  memberSearch: string;
  onMemberSearchChange: (value: string) => void;
  isSearchingMembers?: boolean;
  onSubmit: (values: AdjustPointsValues) => void | Promise<void>;
  onOpenChange: (open: boolean) => void;
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
}

const Field = ({ id, label, error, children, required = true }: FieldProps) => (
  <div className="grid gap-1.5">
    <label htmlFor={id} className="text-sm font-medium text-[#374151]">
      {label}
      {required && (
        <span aria-hidden="true" className="ml-0.5 text-[#DC2626]">
          *
        </span>
      )}
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} className="text-xs text-[#B91C1C]">
        {error}
      </p>
    )}
  </div>
);

const inputClass = (hasError: boolean) =>
  cn(
    "h-11 rounded-lg border-[#D1D5DB] text-sm text-[#1A1A1A]",
    hasError && "border-[#DC2626] focus-visible:ring-[#DC2626]/20",
  );

const triggerClass = (hasError: boolean) =>
  cn(
    "h-11 w-full rounded-lg border-[#D1D5DB] text-sm text-[#1A1A1A]",
    hasError && "border-[#DC2626] focus-visible:ring-[#DC2626]/20",
  );

const AdjustPointsModal = ({
  open,
  membershipOptions,
  memberSearch,
  onMemberSearchChange,
  isSearchingMembers,
  onSubmit,
  onOpenChange,
}: AdjustPointsModalProps) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AdjustPointsValues>({
    resolver: yupResolver(adjustPointsSchema),
    mode: "onTouched",
    defaultValues: EMPTY_VALUES,
  });

  useEffect(() => {
    if (open) reset(EMPTY_VALUES);
  }, [open, reset]);

  const selectedMembershipId = watch("membershipId");
  const selectedMember = membershipOptions.find(
    (opt) => opt.value === selectedMembershipId,
  );

  const submit = async (values: AdjustPointsValues) => {
    await onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !isSubmitting && onOpenChange(next)}>
      <DialogContent className="gap-0 p-0 sm:max-w-lg">
        <form onSubmit={handleSubmit(submit)} noValidate>
          <DialogHeader className="flex-row items-start gap-3 p-6 pb-4 pr-12">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d6c3a5]/30 text-[#5C4A2A]">
              <Coins aria-hidden="true" className="h-5 w-5" />
            </span>
            <div className="grid gap-1">
              <DialogTitle className="text-lg font-semibold text-[#1A1A1A]">
                Adjust / Add Points
              </DialogTitle>
              <DialogDescription>
                Record a new entry in the member&apos;s point ledger. This
                cannot be edited after it is saved.
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="grid gap-4 px-6 py-4">
            <Field
              id="membershipId"
              label="Member"
              error={errors.membershipId?.message}
            >
              <div className="grid gap-2">
                <BaseInput
                  placeholder="Type at least 2 characters to search by name…"
                  value={memberSearch}
                  onChange={(e) => onMemberSearchChange(e.target.value)}
                  className={inputClass(false)}
                />
                <Controller
                  name="membershipId"
                  control={control}
                  render={({ field }) => (
                    <BaseSelect value={field.value} onValueChange={field.onChange}>
                      <BaseSelectTrigger
                        id="membershipId"
                        aria-invalid={!!errors.membershipId}
                        className={triggerClass(!!errors.membershipId)}
                      >
                        <BaseSelectValue placeholder="Select member">
                          {(value) =>
                            membershipOptions.find((opt) => opt.value === value)
                              ?.label ?? "Select member"
                          }
                        </BaseSelectValue>
                      </BaseSelectTrigger>
                      <BaseSelectContent>
                        {isSearchingMembers && (
                          <div className="px-2 py-1.5 text-xs text-[#6B7280]">
                            Searching…
                          </div>
                        )}
                        {!isSearchingMembers && membershipOptions.length === 0 && (
                          <div className="px-2 py-1.5 text-xs text-[#6B7280]">
                            {memberSearch.trim().length < 2
                              ? "Type a member name to search"
                              : "No members found"}
                          </div>
                        )}
                        {membershipOptions.map((opt) => (
                          <BaseSelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </BaseSelectItem>
                        ))}
                      </BaseSelectContent>
                    </BaseSelect>
                  )}
                />
              </div>
              {selectedMember && (
                <p className="text-xs text-[#6B7280]">
                  Current balance:{" "}
                  <span className="font-medium tabular-nums text-[#1A1A1A]">
                    {selectedMember.currentPoints.toLocaleString()} pts
                  </span>
                </p>
              )}
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="type" label="Type" error={errors.type?.message}>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <BaseSelect value={field.value} onValueChange={field.onChange}>
                      <BaseSelectTrigger
                        id="type"
                        aria-invalid={!!errors.type}
                        className={triggerClass(!!errors.type)}
                      >
                        <BaseSelectValue placeholder="Select type">
                          {(value) =>
                            typeOptions.find((opt) => opt.value === value)
                              ?.label ?? "Select type"
                          }
                        </BaseSelectValue>
                      </BaseSelectTrigger>
                      <BaseSelectContent>
                        {typeOptions.map((opt) => (
                          <BaseSelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </BaseSelectItem>
                        ))}
                      </BaseSelectContent>
                    </BaseSelect>
                  )}
                />
              </Field>

              <Field id="amount" label="Amount" error={errors.amount?.message}>
                <BaseInput
                  id="amount"
                  type="number"
                  inputMode="numeric"
                  step={1}
                  placeholder="100 (use negative to deduct)"
                  aria-invalid={!!errors.amount}
                  aria-describedby={errors.amount ? "amount-error" : undefined}
                  className={inputClass(!!errors.amount)}
                  {...register("amount")}
                />
              </Field>
            </div>

            <Field
              id="description"
              label="Description"
              error={errors.description?.message}
            >
              <BaseInput
                id="description"
                placeholder="e.g. Checkup visit, Manual correction"
                aria-invalid={!!errors.description}
                aria-describedby={
                  errors.description ? "description-error" : undefined
                }
                className={inputClass(!!errors.description)}
                {...register("description")}
              />
            </Field>

            <Field
              id="reference_id"
              label="Reference ID"
              required={false}
              error={errors.reference_id?.message}
            >
              <BaseInput
                id="reference_id"
                placeholder="e.g. Invoice number (optional)"
                className={inputClass(!!errors.reference_id)}
                {...register("reference_id")}
              />
            </Field>
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
                "Save entry"
              )}
            </BaseButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdjustPointsModal;
