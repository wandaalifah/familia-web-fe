"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Loader2, PawPrint } from "lucide-react";
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

const petFormSchema = yup.object({
  userId: yup.string().required("Owner is required"),
  name: yup.string().trim().required("Pet name is required"),
  species: yup.string().trim().required("Species is required"),
  breed: yup.string().trim().optional().default(""),
  birth_date: yup.string().optional().default(""),
  is_neutered: yup.boolean().default(false),
  avatar: yup.string().url("Must be a valid image URL").optional().default(""),
});

export type PetFormValues = yup.InferType<typeof petFormSchema>;

const EMPTY_VALUES: PetFormValues = {
  userId: "",
  name: "",
  species: "Kucing",
  breed: "",
  birth_date: "",
  is_neutered: false,
  avatar: "",
};

interface PetFormModalProps {
  open: boolean;
  initialValues?: PetFormValues;
  ownersOption: { id: string; label: string }[];
  onSubmit: (values: PetFormValues) => void | Promise<void>;
  onOpenChange: (open: boolean) => void;
}

const inputClass = (hasError: boolean) =>
  cn(
    "h-11 w-full rounded-lg border border-[#D1D5DB] bg-white px-3 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#d6c3a5]/50",
    hasError && "border-[#DC2626] focus:ring-[#DC2626]/20",
  );

const PetFormModal = ({
  open,
  initialValues,
  ownersOption,
  onSubmit,
  onOpenChange,
}: PetFormModalProps) => {
  const isEdit = Boolean(initialValues);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PetFormValues>({
    resolver: yupResolver(petFormSchema) as any,
    mode: "onTouched",
    defaultValues: initialValues ?? EMPTY_VALUES,
  });

  useEffect(() => {
    if (open) reset(initialValues ?? EMPTY_VALUES);
  }, [open, initialValues, reset]);

  const submit = async (values: PetFormValues) => {
    await onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !isSubmitting && onOpenChange(next)}>
      <DialogContent className="gap-0 p-0 sm:max-w-lg">
        <form onSubmit={handleSubmit(submit)} noValidate>
          <DialogHeader className="flex-row items-start gap-3 p-6 pb-4 pr-12">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d6c3a5]/30 text-[#5C4A2A]">
              <PawPrint aria-hidden="true" className="h-5 w-5" />
            </span>
            <div className="grid gap-1">
              <DialogTitle className="text-lg font-semibold text-[#1A1A1A]">
                {isEdit ? "Edit Pet Profile" : "Register New Pet"}
              </DialogTitle>
              <DialogDescription>
                {isEdit
                  ? "Update the pet's clinical and demographic profile."
                  : "Link a new pet to a registered clinic member."}
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="grid gap-4 px-6 py-4">
            <div className="grid gap-1.5">
              <label htmlFor="userId" className="text-sm font-medium text-[#374151]">
                Owner <span className="text-[#DC2626]">*</span>
              </label>
              <select
                id="userId"
                disabled={isEdit}
                className={cn(inputClass(!!errors.userId), "cursor-pointer disabled:cursor-not-allowed disabled:opacity-60")}
                {...register("userId")}
              >
                <option value="">Select pet owner...</option>
                {ownersOption.map((owner) => (
                  <option key={owner.id} value={owner.id}>
                    {owner.label}
                  </option>
                ))}
              </select>
              {errors.userId && (
                <p className="text-xs text-[#B91C1C]">{errors.userId.message}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-[#374151]">
                  Pet Name <span className="text-[#DC2626]">*</span>
                </label>
                <BaseInput
                  id="name"
                  placeholder="Mochi"
                  className={inputClass(!!errors.name)}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-[#B91C1C]">{errors.name.message}</p>
                )}
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="species" className="text-sm font-medium text-[#374151]">
                  Species <span className="text-[#DC2626]">*</span>
                </label>
                <select
                  id="species"
                  className={cn(inputClass(!!errors.species), "cursor-pointer")}
                  {...register("species")}
                >
                  <option value="Kucing">Kucing (Cat)</option>
                  <option value="Anjing">Anjing (Dog)</option>
                  <option value="Kelinci">Kelinci (Rabbit)</option>
                  <option value="Burung">Burung (Bird)</option>
                  <option value="Lainnya">Lainnya (Other)</option>
                </select>
                {errors.species && (
                  <p className="text-xs text-[#B91C1C]">{errors.species.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <label htmlFor="breed" className="text-sm font-medium text-[#374151]">
                  Breed
                </label>
                <BaseInput
                  id="breed"
                  placeholder="British Shorthair"
                  className={inputClass(!!errors.breed)}
                  {...register("breed")}
                />
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="birth_date" className="text-sm font-medium text-[#374151]">
                  Birth Date
                </label>
                <BaseInput
                  id="birth_date"
                  type="date"
                  className={inputClass(!!errors.birth_date)}
                  {...register("birth_date")}
                />
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-2.5 pt-1">
              <input
                type="checkbox"
                className="h-4 w-4 cursor-pointer rounded border-[#D1D5DB] text-[#5C4A2A] focus:ring-[#5C4A2A]"
                {...register("is_neutered")}
              />
              <span className="text-sm font-medium text-[#374151]">
                Pet is neutered / spayed (Sudah Steril)
              </span>
            </label>
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
                  <Loader2 aria-hidden="true" className="h-4 w-4 motion-safe:animate-spin" />
                  Saving…
                </>
              ) : isEdit ? (
                "Save changes"
              ) : (
                "Register pet"
              )}
            </BaseButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PetFormModal;
