"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { BaseInput } from "@/src/components/atoms/input";
import { cn } from "@/lib/utils";
import { MedicalRecordType } from "@/src/interfaces/admin/medical-records/list";
import type { MedicalRecordFormValues } from "./medical-record-form-modal";

interface ClinicalFieldsProps {
  type: MedicalRecordType;
  register: UseFormRegister<MedicalRecordFormValues>;
  errors: FieldErrors<MedicalRecordFormValues>;
}

const inputClass = (hasError: boolean) =>
  cn(
    "h-11 w-full rounded-lg border border-[#D1D5DB] bg-white px-3 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#d6c3a5]/50",
    hasError && "border-[#DC2626] focus:ring-[#DC2626]/20",
  );

const textareaClass =
  "w-full rounded-lg border border-[#D1D5DB] p-3 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#d6c3a5]/50";

const labelClass = "text-sm font-medium text-[#374151]";

type TextField = keyof Pick<
  MedicalRecordFormValues,
  | "complaint"
  | "clinical_signs"
  | "diagnosis"
  | "treatment"
  | "prescription"
  | "notes"
>;

const TextArea = ({
  name,
  label,
  placeholder,
  register,
  rows = 2,
}: {
  name: TextField;
  label: string;
  placeholder?: string;
  register: UseFormRegister<MedicalRecordFormValues>;
  rows?: number;
}) => (
  <div className="grid gap-1.5">
    <label htmlFor={name} className={labelClass}>
      {label}
    </label>
    <textarea
      id={name}
      rows={rows}
      placeholder={placeholder}
      className={textareaClass}
      {...register(name)}
    />
  </div>
);

const TextInput = ({
  name,
  label,
  placeholder,
  register,
  type = "text",
  error,
}: {
  name:
    | "weight"
    | "temperature"
    | "appetite"
    | "defecation"
    | "urination"
    | "vomiting"
    | "medical_staff_name";
  label: string;
  placeholder?: string;
  register: UseFormRegister<MedicalRecordFormValues>;
  type?: "text" | "number";
  error?: string;
}) => (
  <div className="grid gap-1.5">
    <label htmlFor={name} className={labelClass}>
      {label}
    </label>
    <BaseInput
      id={name}
      type={type}
      step={type === "number" ? "0.1" : undefined}
      min={type === "number" ? 0 : undefined}
      placeholder={placeholder}
      className={inputClass(Boolean(error))}
      {...register(name)}
    />
    {error && <p className="text-xs text-[#B91C1C]">{error}</p>}
  </div>
);

/**
 * Examination / observation fields of `medical_history`.
 * RAWAT_JALAN (outpatient) and RAWAT_INAP (daily inpatient report) share the same
 * columns; only the labels and the level of detail differ.
 */
const ClinicalFields = ({ type, register, errors }: ClinicalFieldsProps) => {
  const isInpatient = type === "RAWAT_INAP";

  return (
    <div className="grid gap-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB]/60 p-3">
      <TextArea
        name="complaint"
        register={register}
        label={isInpatient ? "Main Complaint (Keluhan Utama)" : "Complaint (Keluhan)"}
        placeholder="e.g., Vulnus, mata bengkak"
      />

      {isInpatient && (
        <TextArea
          name="notes"
          register={register}
          label="Initial Condition / Daily Progress"
          placeholder="Kondisi awal atau progress harian..."
        />
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          name="weight"
          type="number"
          register={register}
          label="Weight (kg)"
          placeholder="e.g., 2.2"
          error={errors.weight?.message}
        />
        <TextInput
          name="temperature"
          type="number"
          register={register}
          label="Temperature (°C)"
          placeholder="e.g., 38.5"
          error={errors.temperature?.message}
        />
        <TextInput
          name="appetite"
          register={register}
          label="Eat & Drink (Makan & Minum)"
          placeholder="e.g., Makan minum masih mau"
        />
        <TextInput
          name="vomiting"
          register={register}
          label="Vomiting (Muntah)"
          placeholder="e.g., Tidak ada"
        />
        <TextInput
          name="defecation"
          register={register}
          label="Defecation (Pup)"
          placeholder="e.g., Normal"
        />
        <TextInput
          name="urination"
          register={register}
          label="Urination (Pip)"
          placeholder="e.g., Normal"
        />
      </div>

      <TextArea
        name="clinical_signs"
        register={register}
        label="Clinical Signs / Physical Exam"
        placeholder="Detailed physical examination findings..."
      />
      <TextArea
        name="diagnosis"
        register={register}
        label="Diagnosis"
        placeholder="e.g., Susp. FHV, Scabies"
      />
      <TextArea
        name="treatment"
        register={register}
        label={isInpatient ? "Treatment / Therapy (Tindakan)" : "Treatment (Tindakan)"}
        placeholder="Tindakan / terapi yang diberikan"
      />
      <TextArea
        name="prescription"
        register={register}
        label={isInpatient ? "Medication & Plan (Obat & Advice)" : "Prescription & Advice"}
        placeholder="R/ ... dan rencana tindak lanjut"
      />

      <TextInput
        name="medical_staff_name"
        register={register}
        label="Medical Staff / In-charge (Paraf)"
        placeholder="e.g., drh. Budi"
      />
    </div>
  );
};

export default ClinicalFields;
