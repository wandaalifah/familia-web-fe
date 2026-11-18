"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import debounce from "lodash/debounce";
import { Info, Loader2, Stethoscope } from "lucide-react";
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
import ClinicalFields from "./clinical-fields";
import { nowDateTimeLocal } from "@/src/utils/medical/datetime";
import { MedicalRecordType } from "@/src/interfaces/admin/medical-records/list";
import { useVaccineCatalogQuery } from "@/src/services/query/admin/medical-records/vaccines";
import { useMedicalRecordPetOptionsQuery } from "@/src/services/query/admin/medical-records/pet-options";
import {
  BASIC_VACCINE_DOSES,
  calculateNextDueDate,
  hasAutoNextDueDate,
} from "@/src/utils/medical/next-due";

// Blank input = not recorded (undefined), otherwise a non-negative number.
const optionalNumber = (label: string) =>
  yup
    .number()
    .transform((value, original) =>
      original === "" || original == null ? undefined : value,
    )
    .typeError(`${label} must be a number`)
    .min(0, `${label} cannot be negative`)
    .optional();

const medicalRecordSchema = yup.object({
  petId: yup.string().required("Patient (Pet) is required"),
  type: yup
    .mixed<MedicalRecordType>()
    .oneOf(["VACCINE", "DEWORMING", "GROOMING", "RAWAT_INAP", "RAWAT_JALAN"])
    .required("Record type is required"),
  title: yup.string().trim().required("Treatment title is required"),
  vaccine_name: yup.string().when("type", {
    is: "VACCINE",
    then: (schema) =>
      schema.trim().required("Vaccine name is required for vaccine records"),
    otherwise: (schema) => schema.optional().default(""),
  }),
  // Blank = automatic (previous doses of the same vaccine + 1)
  dose_number: yup
    .number()
    .transform((value, original) =>
      original === "" || original == null ? undefined : value,
    )
    .integer("Dose must be a whole number")
    .min(1, "Dose starts at 1")
    .optional(),
  administered_at: yup.string().required("Treatment date is required"),
  next_due_date: yup.string().optional().default(""),
  discharged_at: yup.string().optional().default(""),
  doctor_name: yup.string().trim().optional().default(""),
  medical_staff_name: yup.string().trim().optional().default(""),
  complaint: yup.string().trim().optional().default(""),
  clinical_signs: yup.string().trim().optional().default(""),
  diagnosis: yup.string().trim().optional().default(""),
  weight: optionalNumber("Weight"),
  temperature: optionalNumber("Temperature"),
  appetite: yup.string().trim().optional().default(""),
  defecation: yup.string().trim().optional().default(""),
  urination: yup.string().trim().optional().default(""),
  vomiting: yup.string().trim().optional().default(""),
  treatment: yup.string().trim().optional().default(""),
  prescription: yup.string().trim().optional().default(""),
  notes: yup.string().trim().optional().default(""),
  award_points: yup
    .number()
    .transform((v, orig) => (orig === "" ? 0 : v))
    .min(0, "Points cannot be negative")
    .default(0),
});

export type MedicalRecordFormValues = yup.InferType<typeof medicalRecordSchema>;

const getEmptyValues = (): MedicalRecordFormValues => ({
  petId: "",
  type: "RAWAT_JALAN",
  title: "",
  vaccine_name: "",
  dose_number: undefined,
  administered_at: nowDateTimeLocal(),
  next_due_date: "",
  discharged_at: "",
  doctor_name: "",
  medical_staff_name: "",
  complaint: "",
  clinical_signs: "",
  diagnosis: "",
  weight: undefined,
  temperature: undefined,
  appetite: "",
  defecation: "",
  urination: "",
  vomiting: "",
  treatment: "",
  prescription: "",
  notes: "",
  award_points: 0,
});

interface MedicalRecordFormModalProps {
  open: boolean;
  initialValues?: MedicalRecordFormValues;
  /** Display-only patient info for edit mode, where the patient can't be changed. */
  selectedPet?: { label: string; species: string | null };
  onSubmit: (values: MedicalRecordFormValues) => void | Promise<void>;
  onOpenChange: (open: boolean) => void;
}

const inputClass = (hasError: boolean) =>
  cn(
    "h-11 w-full rounded-lg border border-[#D1D5DB] bg-white px-3 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#d6c3a5]/50",
    hasError && "border-[#DC2626] focus:ring-[#DC2626]/20",
  );

const MedicalRecordFormModal = ({
  open,
  initialValues,
  selectedPet,
  onSubmit,
  onOpenChange,
}: MedicalRecordFormModalProps) => {
  const isEdit = Boolean(initialValues);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MedicalRecordFormValues>({
    resolver: yupResolver(medicalRecordSchema),
    mode: "onTouched",
    defaultValues: initialValues ?? getEmptyValues(),
  });

  const selectedType = watch("type");
  const isClinicalType = selectedType === "RAWAT_JALAN" || selectedType === "RAWAT_INAP";
  const selectedPetId = watch("petId");
  const selectedVaccine = watch("vaccine_name");
  const administeredAt = watch("administered_at");
  const doseNumber = watch("dose_number");

  const [petSearchInput, setPetSearchInput] = useState("");
  const [petSearch, setPetSearch] = useState("");
  const debouncedSetPetSearch = useMemo(() => debounce(setPetSearch, 400), []);
  useEffect(() => () => debouncedSetPetSearch.cancel(), [debouncedSetPetSearch]);

  const petOptionsQuery = useMedicalRecordPetOptionsQuery(petSearch, !isEdit);
  const petOptions = petOptionsQuery.data ?? [];

  const selectedSpecies = isEdit
    ? (selectedPet?.species ?? undefined)
    : petOptions.find((pet) => pet.id === selectedPetId)?.species ?? undefined;
  const catalog = useVaccineCatalogQuery(selectedSpecies);
  const vaccineOptions = catalog.data ?? [];
  // A legacy vaccine name outside the catalog stays selectable so editing never blanks it
  const hasLegacyVaccine =
    Boolean(selectedVaccine) &&
    !vaccineOptions.some((vaccine) => vaccine.name === selectedVaccine);

  const autoNextDueDate = hasAutoNextDueDate(selectedType)
    ? calculateNextDueDate(selectedType, administeredAt, doseNumber)
    : null;

  useEffect(() => {
    if (open) {
      reset(initialValues ?? getEmptyValues());
      setPetSearchInput("");
      setPetSearch("");
    }
  }, [open, initialValues, reset]);

  const submit = async (values: MedicalRecordFormValues) => {
    await onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !isSubmitting && onOpenChange(next)}>
      <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto p-0 sm:max-w-2xl">
        <form onSubmit={handleSubmit(submit)} noValidate>
          <DialogHeader className="flex-row items-start gap-3 p-6 pb-4 pr-12">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d6c3a5]/30 text-[#5C4A2A]">
              <Stethoscope aria-hidden="true" className="h-5 w-5" />
            </span>
            <div className="grid gap-1">
              <DialogTitle className="text-lg font-semibold text-[#1A1A1A]">
                {isEdit ? "Update Medical Record" : "New Medical Record"}
              </DialogTitle>
              <DialogDescription>
                Record clinical services, vaccinations, or hospitalization details.
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="grid gap-4 px-6 py-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <label htmlFor="petId" className="text-sm font-medium text-[#374151]">
                  Patient (Pet) <span className="text-[#DC2626]">*</span>
                </label>
                {isEdit ? (
                  <p className="flex h-11 items-center rounded-lg border border-dashed border-[#D1D5DB] bg-[#F9FAFB] px-3 text-sm text-[#374151]">
                    {selectedPet?.label ?? "—"}
                  </p>
                ) : (
                  <>
                    <BaseInput
                      placeholder="Search patient by name..."
                      value={petSearchInput}
                      onChange={(e) => {
                        setPetSearchInput(e.target.value);
                        debouncedSetPetSearch(e.target.value);
                      }}
                      className={cn(inputClass(false), "mb-1")}
                    />
                    <select
                      id="petId"
                      className={cn(inputClass(!!errors.petId), "cursor-pointer")}
                      {...register("petId")}
                    >
                      <option value="">
                        {petOptionsQuery.isLoading
                          ? "Loading patients..."
                          : "Select patient..."}
                      </option>
                      {petOptions.map((pet) => (
                        <option key={pet.id} value={pet.id}>
                          {pet.name} ({pet.users.first_name} {pet.users.last_name})
                        </option>
                      ))}
                    </select>
                  </>
                )}
                {errors.petId && (
                  <p className="text-xs text-[#B91C1C]">{errors.petId.message}</p>
                )}
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="type" className="text-sm font-medium text-[#374151]">
                  Service Type <span className="text-[#DC2626]">*</span>
                </label>
                <select
                  id="type"
                  className={cn(inputClass(!!errors.type), "cursor-pointer")}
                  {...register("type")}
                >
                  <option value="RAWAT_JALAN">Rawat Jalan (Outpatient)</option>
                  <option value="VACCINE">Vaccine</option>
                  <option value="DEWORMING">Deworming (Obat Cacing &amp; Kutu)</option>
                  <option value="GROOMING">Grooming</option>
                  <option value="RAWAT_INAP">Rawat Inap (Inpatient)</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <label htmlFor="title" className="text-sm font-medium text-[#374151]">
                  Treatment / Service Title <span className="text-[#DC2626]">*</span>
                </label>
                <BaseInput
                  id="title"
                  placeholder="e.g., Vaksin Tahunan Tricat"
                  className={inputClass(!!errors.title)}
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-xs text-[#B91C1C]">{errors.title.message}</p>
                )}
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="doctor_name" className="text-sm font-medium text-[#374151]">
                  {selectedType === "RAWAT_INAP"
                    ? "Responsible Veterinarian (DPJP)"
                    : "Attending Veterinarian"}
                </label>
                <BaseInput
                  id="doctor_name"
                  placeholder="e.g., drh. Anisa Putri"
                  className={inputClass(!!errors.doctor_name)}
                  {...register("doctor_name")}
                />
              </div>
            </div>

            {selectedType === "VACCINE" && (
              <div className="grid gap-3 rounded-lg border border-[#BFDBFE] bg-[#EFF6FF]/50 p-3">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <label htmlFor="vaccine_name" className="text-sm font-medium text-[#1E3A8A]">
                      Vaccine <span className="text-[#DC2626]">*</span>
                    </label>
                    <select
                      id="vaccine_name"
                      disabled={!selectedSpecies || catalog.isLoading}
                      className={cn(
                        inputClass(!!errors.vaccine_name),
                        "cursor-pointer disabled:cursor-not-allowed disabled:opacity-60",
                      )}
                      {...register("vaccine_name")}
                    >
                      <option value="">
                        {selectedSpecies
                          ? catalog.isLoading
                            ? "Loading vaccines..."
                            : "Select vaccine..."
                          : "Select patient first..."}
                      </option>
                      {hasLegacyVaccine && (
                        <option value={selectedVaccine}>{selectedVaccine} (legacy)</option>
                      )}
                      {vaccineOptions.map((vaccine) => (
                        <option key={vaccine.name} value={vaccine.name}>
                          {vaccine.name} — {vaccine.description}
                        </option>
                      ))}
                    </select>
                    {errors.vaccine_name && (
                      <p className="text-xs text-[#B91C1C]">{errors.vaccine_name.message}</p>
                    )}
                    {catalog.isError && (
                      <p className="text-xs text-[#B91C1C]">
                        Could not load the vaccine list. Please try again.
                      </p>
                    )}
                  </div>

                  <div className="grid gap-1.5">
                    <label htmlFor="dose_number" className="text-sm font-medium text-[#1E3A8A]">
                      Dose Number
                    </label>
                    <BaseInput
                      id="dose_number"
                      type="number"
                      min={1}
                      placeholder="Auto"
                      className={inputClass(!!errors.dose_number)}
                      {...register("dose_number")}
                    />
                    {errors.dose_number && (
                      <p className="text-xs text-[#B91C1C]">{errors.dose_number.message}</p>
                    )}
                  </div>
                </div>

                <p className="flex items-start gap-2 text-xs text-[#1E3A8A]">
                  <Info aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>
                    Doses 1–{BASIC_VACCINE_DOSES} repeat in 1 month; from dose{" "}
                    {BASIC_VACCINE_DOSES + 1} the booster is yearly. Deworming &amp; flea
                    treatment must be given at least 7 days before the vaccine, and the owner
                    is reminded 14 days before.
                  </span>
                </p>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <label htmlFor="administered_at" className="text-sm font-medium text-[#374151]">
                  Administered Date &amp; Time <span className="text-[#DC2626]">*</span>
                </label>
                <BaseInput
                  id="administered_at"
                  type="datetime-local"
                  className={inputClass(!!errors.administered_at)}
                  {...register("administered_at")}
                />
              </div>

              {selectedType === "RAWAT_INAP" ? (
                <div className="grid gap-1.5">
                  <label htmlFor="discharged_at" className="text-sm font-medium text-[#374151]">
                    Discharged Date (Leave blank if still admitted)
                  </label>
                  <BaseInput
                    id="discharged_at"
                    type="date"
                    className={inputClass(!!errors.discharged_at)}
                    {...register("discharged_at")}
                  />
                </div>
              ) : hasAutoNextDueDate(selectedType) ? (
                <div className="grid gap-1.5">
                  <span className="text-sm font-medium text-[#374151]">
                    Next Due Date (calculated by the server)
                  </span>
                  <p className="flex h-11 items-center rounded-lg border border-dashed border-[#D1D5DB] bg-[#F9FAFB] px-3 text-sm text-[#374151]">
                    {autoNextDueDate ??
                      (selectedType === "VACCINE"
                        ? "Preview after dose is known"
                        : "—")}
                  </p>
                </div>
              ) : (
                <div className="grid gap-1.5">
                  <label htmlFor="next_due_date" className="text-sm font-medium text-[#374151]">
                    Next Due / Follow-up Date
                  </label>
                  <BaseInput
                    id="next_due_date"
                    type="date"
                    className={inputClass(!!errors.next_due_date)}
                    {...register("next_due_date")}
                  />
                </div>
              )}
            </div>

            {isClinicalType && (
              <ClinicalFields type={selectedType} register={register} errors={errors} />
            )}

            {selectedType !== "RAWAT_INAP" && (
              <div className="grid gap-1.5">
                <label htmlFor="notes" className="text-sm font-medium text-[#374151]">
                  Notes / Post-Treatment Instructions
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  placeholder="Instructions for pet owner..."
                  className="w-full rounded-lg border border-[#D1D5DB] p-3 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#d6c3a5]/50"
                  {...register("notes")}
                />
              </div>
            )}

            {!isEdit && (
              <div className="grid gap-1.5 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-3">
                <label htmlFor="award_points" className="text-sm font-medium text-[#374151]">
                  Award Loyalty Points to Owner (Optional)
                </label>
                <BaseInput
                  id="award_points"
                  type="number"
                  min={0}
                  placeholder="0"
                  className={inputClass(!!errors.award_points)}
                  {...register("award_points")}
                />
                <p className="text-xs text-[#6B7280]">
                  Credits the owner&apos;s point balance immediately on save. The
                  owner must already have a membership, or saving will fail.
                </p>
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
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 aria-hidden="true" className="h-4 w-4 motion-safe:animate-spin" />
                  Saving…
                </>
              ) : isEdit ? (
                "Update record"
              ) : (
                "Save record"
              )}
            </BaseButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MedicalRecordFormModal;
