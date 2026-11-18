"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Layers, Loader2, PencilLine } from "lucide-react";
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

const tierFormSchema = yup.object({
  name: yup.string().trim().required("Tier name is required"),
  description: yup.string().trim().required("Description is required"),
  level: yup
    .number()
    .typeError("Level must be a number")
    .integer("Level must be a whole number")
    .min(1, "Level must be at least 1")
    .required("Level is required"),
  required_points: yup
    .number()
    .typeError("Required points must be a number")
    .integer("Required points must be a whole number")
    .min(0, "Required points cannot be negative")
    .required("Required points is required"),
});

export type TierFormValues = yup.InferType<typeof tierFormSchema>;

const EMPTY_VALUES: TierFormValues = {
  name: "",
  description: "",
  level: 1,
  required_points: 0,
};

interface TierFormModalProps {
  open: boolean;
  /** Pass the tier values to edit; omit (undefined) to create a new tier. */
  initialValues?: TierFormValues;
  onSubmit: (values: TierFormValues) => void | Promise<void>;
  onOpenChange: (open: boolean) => void;
}

interface FieldProps {
  id: keyof TierFormValues;
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

const TierFormModal = ({
  open,
  initialValues,
  onSubmit,
  onOpenChange,
}: TierFormModalProps) => {
  const isEdit = Boolean(initialValues);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TierFormValues>({
    resolver: yupResolver(tierFormSchema),
    mode: "onTouched",
    defaultValues: initialValues ?? EMPTY_VALUES,
  });

  useEffect(() => {
    if (open) reset(initialValues ?? EMPTY_VALUES);
  }, [open, initialValues, reset]);

  const submit = async (values: TierFormValues) => {
    await onSubmit(values);
    onOpenChange(false);
  };

  const Icon = isEdit ? PencilLine : Layers;

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
                {isEdit ? "Edit Tier" : "New Tier"}
              </DialogTitle>
              <DialogDescription>
                {isEdit
                  ? "Update this tier's details and point threshold."
                  : "Define a new membership tier and its point threshold."}
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="grid gap-4 px-6 py-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label="Tier name" error={errors.name?.message}>
                <BaseInput
                  id="name"
                  placeholder="Gold"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={inputClass(!!errors.name)}
                  {...register("name")}
                />
              </Field>
              <Field id="level" label="Level" error={errors.level?.message}>
                <BaseInput
                  id="level"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={1}
                  placeholder="1"
                  aria-invalid={!!errors.level}
                  aria-describedby={errors.level ? "level-error" : undefined}
                  className={inputClass(!!errors.level)}
                  {...register("level")}
                />
              </Field>
            </div>

            <Field
              id="description"
              label="Description"
              error={errors.description?.message}
            >
              <textarea
                id="description"
                rows={3}
                placeholder="Describe the perks and benefits of this tier"
                aria-invalid={!!errors.description}
                aria-describedby={
                  errors.description ? "description-error" : undefined
                }
                className={textareaClass(!!errors.description)}
                {...register("description")}
              />
            </Field>

            <Field
              id="required_points"
              label="Required points"
              error={errors.required_points?.message}
            >
              <BaseInput
                id="required_points"
                type="number"
                inputMode="numeric"
                min={0}
                step={1}
                placeholder="1000"
                aria-invalid={!!errors.required_points}
                aria-describedby={
                  errors.required_points ? "required_points-error" : undefined
                }
                className={inputClass(!!errors.required_points)}
                {...register("required_points")}
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
                "Create tier"
              )}
            </BaseButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TierFormModal;
