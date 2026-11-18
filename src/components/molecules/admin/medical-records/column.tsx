"use client";

import {
  IMedicalRecord,
  MedicalRecordType,
} from "@/src/interfaces/admin/medical-records/list";
import { ColumnDef } from "@tanstack/react-table";
import { BaseButton } from "@/src/components/atoms/button";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TYPE_BADGE_MAP: Record<
  MedicalRecordType,
  { label: string; className: string }
> = {
  VACCINE: { label: "Vaccine", className: "bg-[#EFF6FF] text-[#1D4ED8]" },
  DEWORMING: { label: "Obat Cacing", className: "bg-[#FFFBEB] text-[#B45309]" },
  GROOMING: { label: "Grooming", className: "bg-[#FDF4FF] text-[#A21CAF]" },
  RAWAT_INAP: { label: "Rawat Inap", className: "bg-[#FEF2F2] text-[#B91C1C]" },
  RAWAT_JALAN: { label: "Rawat Jalan", className: "bg-[#ECFDF5] text-[#047857]" },
};

const formatDate = (date: Date | string | null) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getColumnsManageMedicalRecords = ({
  onEdit,
  onDelete,
}: Props): ColumnDef<IMedicalRecord>[] => [
  {
    id: "administered_at",
    accessorKey: "administered_at",
    header: "Date",
    cell({ row }) {
      return (
        <span className="whitespace-nowrap text-sm text-[#374151]">
          {formatDate(row.original.administered_at)}
          <span className="block text-xs text-[#6B7280]">
            {new Date(row.original.administered_at).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </span>
      );
    },
  },
  {
    id: "patient",
    header: "Patient & Owner",
    cell({ row }) {
      const { pet } = row.original;
      const owner = pet.users;
      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-[#1A1A1A]">
            {pet.name}{" "}
            <span className="font-normal text-[#6B7280]">({pet.species})</span>
          </span>
          <span className="text-xs text-[#6B7280]">
            {owner.first_name} {owner.last_name} • {owner.phone}
          </span>
        </div>
      );
    },
  },
  {
    id: "type",
    accessorKey: "type",
    header: "Type",
    cell({ row }) {
      const badge = TYPE_BADGE_MAP[row.original.type];
      return (
        <span
          className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.className}`}
        >
          {badge.label}
        </span>
      );
    },
  },
  {
    id: "title",
    accessorKey: "title",
    header: "Treatment / Diagnosis",
    cell({ row }) {
      const { title, vaccine_name, type, diagnosis } = row.original;
      return (
        <div className="flex max-w-xs flex-col">
          <span className="truncate text-sm font-medium text-[#1A1A1A]">{title}</span>
          {diagnosis && (
            <span className="truncate text-xs text-[#6B7280]">Dx: {diagnosis}</span>
          )}
          {type === "VACCINE" && vaccine_name && (
            <span className="text-xs text-[#1D4ED8]">Vaccine: {vaccine_name}</span>
          )}
        </div>
      );
    },
    meta: { className: "max-w-xs" },
  },
  {
    id: "doctor_name",
    accessorKey: "doctor_name",
    header: "Veterinarian",
    cell({ row }) {
      return (
        <span className="text-sm text-[#374151]">
          {row.original.doctor_name || "—"}
        </span>
      );
    },
  },
  {
    id: "follow_up",
    header: "Next Due / Discharge",
    cell({ row }) {
      const { type, next_due_date, discharged_at } = row.original;
      if (type === "RAWAT_INAP") {
        return discharged_at ? (
          <span className="text-xs text-[#047857]">
            Discharged: {formatDate(discharged_at)}
          </span>
        ) : (
          <span className="inline-flex items-center rounded bg-[#FEF3C7] px-2 py-0.5 text-xs font-medium text-[#B45309]">
            Currently Admitted
          </span>
        );
      }
      return (
        <span className="text-xs text-[#6B7280]">
          {next_due_date ? `Due: ${formatDate(next_due_date)}` : "—"}
        </span>
      );
    },
  },
  {
    id: "action",
    header: "Action",
    cell({ row }) {
      return (
        <div className="flex items-center justify-start gap-1">
          <BaseButton
            variant="outline"
            aria-label={`Edit record for ${row.original.pet.name}`}
            className="h-9 w-9 cursor-pointer border-none bg-transparent p-0 text-[#6B7280] shadow-none hover:bg-[#F3F4F6] hover:text-[#1A1A1A]"
            onClick={() => onEdit(row.original.id)}
          >
            <Pencil aria-hidden="true" className="h-4 w-4" />
          </BaseButton>
          <BaseButton
            variant="outline"
            aria-label={`Delete record for ${row.original.pet.name}`}
            className="h-9 w-9 cursor-pointer border-none bg-transparent p-0 text-[#6B7280] shadow-none hover:bg-[#FEF2F2] hover:text-[#DC2626]"
            onClick={() => onDelete(row.original.id)}
          >
            <Trash2 aria-hidden="true" className="h-4 w-4" />
          </BaseButton>
        </div>
      );
    },
    meta: { className: "w-24" },
  },
];
