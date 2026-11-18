"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Gift, Loader2, PencilLine } from "lucide-react";
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
import { cn } from "@/lib/utils";

const couponFormSchema = yup.object({
  title: yup.string().trim().required("Title is required"),
  description: yup.string().trim().required("Description is required"),
  points_cost: yup
    .number()
    .typeError("Points cost must be a number")
    .integer("Points cost must be a whole number")
    .min(0, "Points cost cannot be negative")
    .required("Points cost is required"),
});

export type CouponFormValues = yup.InferType<typeof couponFormSchema>;

const EMPTY_VALUES: CouponFormValues = {
  title: "",
  description: "",
  points_cost: 0,
};

interface CouponFormModalProps {
  open: boolean;
  initialValues?: CouponFormValues;
  onSubmit: (values: CouponFormValues) => void | Promise<void>;
  onOpenChange: (open: boolean) => void;
}

interface FieldProps {
  id: keyof CouponFormValues;
  label: string;
  error?: string;
  children: React.ReactNode;
}

const Field = ({ id, label, error, children }: FieldProps) => (
  <div className="grid gap-1.5">
    <label htmlFor={id} className="text-sm font-medium text-[#374151]">
      {label}
      <span aria-hidden="true" className="ml-0.5 text-[#DC2626]">
        *
      </span>
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

const textareaClass = (hasError: boolean) =>
  cn(
    "min-h-24 w-full resize-none rounded-lg border bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] transition-colors focus:outline-none focus:ring-2",
    hasError
      ? "border-[#DC2626] focus:ring-[#DC2626]/20"
      : "border-[#D1D5DB] focus:border-[#1A1A1A] focus:ring-[#d6c3a5]/50",
  );

const CouponFormModal = ({
  open,
  initialValues,
  onSubmit,
  onOpenChange,
}: CouponFormModalProps) => {
  const isEdit = Boolean(initialValues);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CouponFormValues>({
    resolver: yupResolver(couponFormSchema),
    mode: "onTouched",
    defaultValues: initialValues ?? EMPTY_VALUES,
  });

  useEffect(() => {
    if (open) reset(initialValues ?? EMPTY_VALUES);
  }, [open, initialValues, reset]);

  const submit = async (values: CouponFormValues) => {
    await onSubmit(values);
    onOpenChange(false);
  };

  const Icon = isEdit ? PencilLine : Gift;

  return (
    <Dialog open={open} onOpenChange={(next) => !isSubmitting && onOpenChange(next)}>
      <DialogContent className="gap-0 p-0 sm:max-w-lg">
        <form onSubmit={handleSubmit(submit)} noValidate>
          <DialogHeader className="flex-row items-start gap-3 p-6 pb-4 pr-12">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d6c3a5]/30 text-[#5C4A2A]">
              <Icon aria-hidden="true" className="h-5 w-5" />
            </span>
            <div className="grid gap-1">
              <DialogTitle className="text-lg font-semibold text-[#1A1A1A]">
                {isEdit ? "Edit Coupon" : "New Coupon"}
              </DialogTitle>
              <DialogDescription>
                {isEdit
                  ? "Update this coupon's details and point cost."
                  : "Add a new coupon to the reward catalog."}
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="grid gap-4 px-6 py-4">
            <Field id="title" label="Coupon title" error={errors.title?.message}>
              <BaseInput
                id="title"
                placeholder="Free Grooming Session"
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? "title-error" : undefined}
                className={inputClass(!!errors.title)}
                {...register("title")}
              />
            </Field>

            <Field
              id="description"
              label="Description"
              error={errors.description?.message}
            >
              <textarea
                id="description"
                rows={3}
                placeholder="Describe what the member gets from this coupon"
                aria-invalid={!!errors.description}
                aria-describedby={
                  errors.description ? "description-error" : undefined
                }
                className={textareaClass(!!errors.description)}
                {...register("description")}
              />
            </Field>

            <Field
              id="points_cost"
              label="Points cost"
              error={errors.points_cost?.message}
            >
              <BaseInput
                id="points_cost"
                type="number"
                inputMode="numeric"
                min={0}
                step={1}
                placeholder="500"
                aria-invalid={!!errors.points_cost}
                aria-describedby={
                  errors.points_cost ? "points_cost-error" : undefined
                }
                className={inputClass(!!errors.points_cost)}
                {...register("points_cost")}
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
              ) : isEdit ? (
                "Save changes"
              ) : (
                "Create coupon"
              )}
            </BaseButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CouponFormModal;
