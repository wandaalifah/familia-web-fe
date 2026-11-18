"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Loader2, Lock, Mail, Phone, UserPlus } from "lucide-react";
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

const PHONE_PATTERN = /^\+?[0-9][0-9\s-]{7,17}$/;
// Mirrors the backend rule: min 8 chars, at least one upper, one lower, one digit.
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const memberFormSchema = yup.object({
  first_name: yup.string().trim().required("First name is required"),
  last_name: yup.string().trim().optional().default(""),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .trim()
    .matches(PHONE_PATTERN, "Enter a valid phone number, e.g. +62 812-3456-7890")
    .required("Phone is required"),
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .matches(
      PASSWORD_PATTERN,
      "Min 8 chars, with an uppercase, a lowercase letter and a number",
    ),
});

export type MemberFormValues = yup.InferType<typeof memberFormSchema>;

const EMPTY_VALUES: MemberFormValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  password: "",
};

interface MemberFormModalProps {
  open: boolean;
  onSubmit: (values: MemberFormValues) => void | Promise<void>;
  onOpenChange: (open: boolean) => void;
}

interface FieldProps {
  id: keyof MemberFormValues;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

const Field = ({ id, label, error, required = true, children }: FieldProps) => (
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

// Create-only: the API contract has no endpoint to edit an existing member's
// profile fields, only to create a new customer+membership or change their
// tier (see tier-change-modal.tsx). Password is optional — if left blank the
// backend is expected to handle provisioning (e.g. an invite/reset flow).
const MemberFormModal = ({
  open,
  onSubmit,
  onOpenChange,
}: MemberFormModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MemberFormValues>({
    resolver: yupResolver(memberFormSchema),
    mode: "onTouched",
    defaultValues: EMPTY_VALUES,
  });

  useEffect(() => {
    if (open) reset(EMPTY_VALUES);
  }, [open, reset]);

  const submit = async (values: MemberFormValues) => {
    await onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !isSubmitting && onOpenChange(next)}>
      <DialogContent className="gap-0 p-0 sm:max-w-lg">
        <form onSubmit={handleSubmit(submit)} noValidate>
          <DialogHeader className="flex-row items-start gap-3 p-6 pb-4 pr-12">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d6c3a5]/30 text-[#5C4A2A]">
              <UserPlus aria-hidden="true" className="h-5 w-5" />
            </span>
            <div className="grid gap-1">
              <DialogTitle className="text-lg font-semibold text-[#1A1A1A]">
                New Membership
              </DialogTitle>
              <DialogDescription>
                Register a new member. Points and tier start from zero.
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="grid gap-4 px-6 py-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="first_name"
                label="First name"
                error={errors.first_name?.message}
              >
                <BaseInput
                  id="first_name"
                  placeholder="Budi"
                  autoComplete="given-name"
                  aria-invalid={!!errors.first_name}
                  aria-describedby={
                    errors.first_name ? "first_name-error" : undefined
                  }
                  className={inputClass(!!errors.first_name)}
                  {...register("first_name")}
                />
              </Field>
              <Field
                id="last_name"
                label="Last name"
                required={false}
                error={errors.last_name?.message}
              >
                <BaseInput
                  id="last_name"
                  placeholder="Santoso"
                  autoComplete="family-name"
                  aria-invalid={!!errors.last_name}
                  aria-describedby={
                    errors.last_name ? "last_name-error" : undefined
                  }
                  className={inputClass(!!errors.last_name)}
                  {...register("last_name")}
                />
              </Field>
            </div>

            <Field id="email" label="Email" error={errors.email?.message}>
              <BaseInput
                id="email"
                type="email"
                inputMode="email"
                placeholder="name@example.com"
                autoComplete="email"
                leftIcon={<Mail className="h-4 w-4" />}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClass(!!errors.email)}
                {...register("email")}
              />
            </Field>

            <Field id="phone" label="Phone" error={errors.phone?.message}>
              <BaseInput
                id="phone"
                type="tel"
                inputMode="tel"
                placeholder="+62 812-3456-7890"
                autoComplete="tel"
                leftIcon={<Phone className="h-4 w-4" />}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={inputClass(!!errors.phone)}
                {...register("phone")}
              />
            </Field>

            <Field
              id="password"
              label="Password"
              required
              error={errors.password?.message}
            >
              <BaseInput
                id="password"
                type="password"
                placeholder="Min 8 chars, with upper, lower case & a number"
                autoComplete="new-password"
                leftIcon={<Lock className="h-4 w-4" />}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
                className={inputClass(!!errors.password)}
                {...register("password")}
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
                "Create member"
              )}
            </BaseButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MemberFormModal;
