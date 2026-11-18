"use client";

import { IMembership } from "@/src/interfaces/admin/membership/list";
import { ColumnDef } from "@tanstack/react-table";
import { BaseButton } from "@/src/components/atoms/button";
import { ArrowLeftRight } from "lucide-react";

interface Props {
  onChangeTier: (id: string) => void;
}

export const getColumnsManageMembership = ({
  onChangeTier,
}: Props): ColumnDef<IMembership>[] => [
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
    cell({ row }) {
      return (
        <span className="text-xs text-[#6B7280]">{row.original.id}</span>
      );
    },
  },
  {
    id: "first_name",
    accessorKey: "users.first_name",
    header: "First Name",
    cell({ row }) {
      return <span>{row.original.users.first_name}</span>;
    },
  },
  {
    id: "last_name",
    accessorKey: "users.last_name",
    header: "Last Name",
    cell({ row }) {
      return <span>{row.original.users.last_name}</span>;
    },
  },
  {
    id: "email",
    accessorKey: "users.email",
    header: "Email",
    cell({ row }) {
      return <span>{row.original.users.email}</span>;
    },
  },
  {
    id: "phone",
    accessorKey: "users.phone",
    header: "Phone",
    cell({ row }) {
      return <span>{row.original.users.phone}</span>;
    },
  },
  {
    id: "tier",
    accessorKey: "tiers.name",
    header: "Tier",
    cell({ row }) {
      const tierName = row.original.tiers?.name;
      if (!tierName) return <span className="text-[#6B7280]">—</span>;
      return (
        <span className="inline-flex items-center rounded-full bg-[#d6c3a5]/30 px-2.5 py-0.5 text-xs font-medium text-[#5C4A2A]">
          {tierName}
        </span>
      );
    },
  },
  {
    id: "points",
    accessorKey: "points",
    header: "Current Points",
    cell({ row }) {
      return (
        <span className="font-medium tabular-nums">
          {row.original.points.toLocaleString()}
        </span>
      );
    },
  },
  {
    id: "seasonal_points",
    accessorKey: "seasonal_points",
    header: "Seasonal Points",
    cell({ row }) {
      return (
        <span className="tabular-nums">
          {row.original.seasonal_points.toLocaleString()}
        </span>
      );
    },
  },
  {
    id: "action",
    accessorKey: "id",
    header: "Action",
    cell({ row }) {
      return (
        <div className="flex items-center justify-start gap-1">
          <BaseButton
            variant={"outline"}
            aria-label="Change tier"
            className="h-9 w-9 cursor-pointer border-none bg-transparent p-0 text-[#6B7280] shadow-none hover:bg-[#F3F4F6] hover:text-[#1A1A1A]"
            onClick={() => onChangeTier(row.original.id)}
          >
            <ArrowLeftRight aria-hidden="true" className="h-4 w-4" />
          </BaseButton>
        </div>
      );
    },
    meta: {
      className: "w-16",
    },
  },
];
