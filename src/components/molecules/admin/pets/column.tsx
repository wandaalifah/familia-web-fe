"use client";

import { IPet } from "@/src/interfaces/admin/pets/list";
import { ColumnDef } from "@tanstack/react-table";
import { BaseButton } from "@/src/components/atoms/button";
import { Archive, FileClock, Pencil } from "lucide-react";

interface Props {
  onEdit: (id: string) => void;
  onArchive: (id: string) => void;
  onViewMedical: (petId: string) => void;
}

const formatPetAge = (birthDate: Date | string | null) => {
  if (!birthDate) return "Unknown";
  const birth = new Date(birthDate);
  const now = new Date();
  const months =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth());
  if (months < 1) return "< 1 mo";
  if (months < 12) return `${months} mos`;
  const years = Math.floor(months / 12);
  const remMonths = months % 12;
  return remMonths > 0 ? `${years}y ${remMonths}m` : `${years} yrs`;
};

export const getColumnsManagePets = ({
  onEdit,
  onArchive,
  onViewMedical,
}: Props): ColumnDef<IPet>[] => [
  {
    id: "name",
    accessorKey: "name",
    header: "Pet Name",
    cell({ row }) {
      const { name, avatar } = row.original;
      return (
        <div className="flex items-center gap-3">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatar}
              alt={name}
              className="h-9 w-9 rounded-full border border-[#E5E7EB] object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d6c3a5]/30 text-xs font-semibold text-[#5C4A2A]">
              {name.slice(0, 2).toUpperCase()}
            </div>
          )}
          <span className="font-medium text-[#1A1A1A]">{name}</span>
        </div>
      );
    },
  },
  {
    id: "species_breed",
    header: "Species & Breed",
    cell({ row }) {
      const { species, breed } = row.original;
      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-[#1A1A1A]">
            {species || "—"}
          </span>
          <span className="text-xs text-[#6B7280]">{breed || "Mixed / Unknown"}</span>
        </div>
      );
    },
  },
  {
    id: "age",
    accessorKey: "birth_date",
    header: "Age",
    cell({ row }) {
      return (
        <span className="text-sm text-[#374151]">
          {formatPetAge(row.original.birth_date)}
        </span>
      );
    },
  },
  {
    id: "is_neutered",
    accessorKey: "is_neutered",
    header: "Sterilized",
    cell({ row }) {
      return row.original.is_neutered ? (
        <span className="inline-flex items-center rounded-full bg-[#ECFDF5] px-2.5 py-0.5 text-xs font-medium text-[#047857]">
          Neutered
        </span>
      ) : (
        <span className="inline-flex items-center rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-xs font-medium text-[#4B5563]">
          Intact
        </span>
      );
    },
  },
  {
    id: "owner",
    header: "Owner",
    cell({ row }) {
      const { users } = row.original;
      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-[#1A1A1A]">
            {users.first_name} {users.last_name}
          </span>
          <span className="text-xs text-[#6B7280]">{users.phone}</span>
        </div>
      );
    },
  },
  {
    id: "medical_records_count",
    header: "Records",
    cell({ row }) {
      return (
        <span className="tabular-nums text-sm font-medium text-[#374151]">
          {row.original._count.medical_history} visits
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
            title="View Medical History"
            aria-label={`View ${row.original.name}'s medical history`}
            className="h-9 w-9 cursor-pointer border-none bg-transparent p-0 text-[#6B7280] shadow-none hover:bg-[#F3F4F6] hover:text-[#5C4A2A]"
            onClick={() => onViewMedical(row.original.id)}
          >
            <FileClock aria-hidden="true" className="h-4 w-4" />
          </BaseButton>
          <BaseButton
            variant="outline"
            title="Edit Pet"
            aria-label={`Edit ${row.original.name}`}
            className="h-9 w-9 cursor-pointer border-none bg-transparent p-0 text-[#6B7280] shadow-none hover:bg-[#F3F4F6] hover:text-[#1A1A1A]"
            onClick={() => onEdit(row.original.id)}
          >
            <Pencil aria-hidden="true" className="h-4 w-4" />
          </BaseButton>
          <BaseButton
            variant="outline"
            title="Archive Pet"
            aria-label={`Archive ${row.original.name}`}
            className="h-9 w-9 cursor-pointer border-none bg-transparent p-0 text-[#6B7280] shadow-none hover:bg-[#FEF2F2] hover:text-[#DC2626]"
            onClick={() => onArchive(row.original.id)}
          >
            <Archive aria-hidden="true" className="h-4 w-4" />
          </BaseButton>
        </div>
      );
    },
    meta: {
      className: "w-32",
    },
  },
];
