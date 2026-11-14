"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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

const editProfileSchema = yup.object({
  firstName: yup.string().required("Nama depan wajib diisi"),
  lastName: yup.string().required("Nama belakang wajib diisi"),
  phone: yup.string().required("Nomor WhatsApp wajib diisi"),
});

type EditProfileValues = yup.InferType<typeof editProfileSchema>;

interface EditProfileModalProps {
  open: boolean;
  defaultValues: EditProfileValues;
  onSubmit: (values: EditProfileValues) => void;
  onOpenChange: (open: boolean) => void;
}

const EditProfileModal = ({
  open,
  defaultValues,
  onSubmit,
  onOpenChange,
}: EditProfileModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProfileValues>({
    resolver: yupResolver(editProfileSchema),
    mode: "onTouched",
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [open, defaultValues, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Ubah Data Pemilik</DialogTitle>
            <DialogDescription>
              Perbarui informasi identitas akun member Anda.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <label
                htmlFor="firstName"
                className="text-xs font-bold text-slate-700"
              >
                Nama Depan
              </label>
              <BaseInput
                id="firstName"
                placeholder="Nama depan"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-[11px] text-rose-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="lastName"
                className="text-xs font-bold text-slate-700"
              >
                Nama Belakang
              </label>
              <BaseInput
                id="lastName"
                placeholder="Nama belakang"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-[11px] text-rose-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="phone"
                className="text-xs font-bold text-slate-700"
              >
                Nomor WhatsApp
              </label>
              <BaseInput
                id="phone"
                placeholder="Contoh: +62 812-3456-7890"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-[11px] text-rose-600">
                  {errors.phone.message}
                </p>
              )}
            </div>
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
            <BaseButton type="submit" className="rounded-full">
              Simpan
            </BaseButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
