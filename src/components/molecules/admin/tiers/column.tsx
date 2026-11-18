"use client";

import { ITier } from "@/src/interfaces/admin/tiers/list";
import { ColumnDef } from "@tanstack/react-table";
import { BaseButton } from "@/src/components/atoms/button";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const LEVEL_BADGE_COLORS = [
  "bg-slate-100 text-slate-700",
  "bg-[#d6c3a5]/30 text-[#5C4A2A]",
  "bg-amber-100 text-amber-800",
  "bg-sky-100 text-sky-800",
  "bg-violet-100 text-violet-800",
];

export const getColumnsManageTiers = ({
  onEdit,
  onDelete,
}: Props): ColumnDef<ITier>[] => [
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
    cell({ row }) {
      return <span className="text-xs text-[#6B7280]">{row.original.id}</span>;
    },
  },
  {
    id: "level",
    accessorKey: "level",
    header: "Level",
    cell({ row }) {
      const colorClass =
        LEVEL_BADGE_COLORS[(row.original.level - 1) % LEVEL_BADGE_COLORS.length];
      return (
        <span
          className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-semibold tabular-nums ${colorClass}`}
        >
          {row.original.level}
        </span>
      );
    },
    meta: {
      className: "w-20",
    },
  },
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    cell({ row }) {
      return (
        <span className="font-medium text-[#1A1A1A]">{row.original.name}</span>
      );
    },
  },
  {
    id: "description",
    accessorKey: "description",
    header: "Description",
    cell({ row }) {
      return (
        <span
          title={row.original.description}
          className="block max-w-xs truncate text-[#6B7280]"
        >
          {row.original.description}
        </span>
      );
    },
    meta: {
      className: "max-w-xs",
    },
  },
  {
    id: "required_points",
    accessorKey: "required_points",
    header: "Required Points",
    cell({ row }) {
      return (
        <span className="font-medium tabular-nums">
          {row.original.required_points.toLocaleString()}
        </span>
      );
    },
  },
  {
    id: "member_count",
    accessorKey: "_count.memberships",
    header: "Active Members",
    cell({ row }) {
      return (
        <span className="tabular-nums text-[#6B7280]">
          {row.original._count.memberships.toLocaleString()}
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
            aria-label={`Edit ${row.original.name} tier`}
            className="h-9 w-9 cursor-pointer border-none bg-transparent p-0 text-[#6B7280] shadow-none hover:bg-[#F3F4F6] hover:text-[#1A1A1A]"
            onClick={() => onEdit(row.original.id)}
          >
            <Pencil aria-hidden="true" className="h-4 w-4" />
          </BaseButton>
          <BaseButton
            variant={"outline"}
            aria-label={`Delete ${row.original.name} tier`}
            className="h-9 w-9 cursor-pointer border-none bg-transparent p-0 text-[#6B7280] shadow-none hover:bg-[#FEF2F2] hover:text-[#DC2626]"
            onClick={() => onDelete(row.original.id)}
          >
            <Trash2 aria-hidden="true" className="h-4 w-4" />
          </BaseButton>
        </div>
      );
    },
    meta: {
      className: "w-24",
    },
  },
];
