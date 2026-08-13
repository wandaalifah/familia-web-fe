"use client";

import { IMembership } from "@/src/interfaces/admin/membership/list";
import { ColumnDef } from "@tanstack/react-table";
import { BaseButton } from "@/src/components/atoms/button";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const getColumnsManageMembership = ({
  onEdit,
  onDelete,
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
      return (
        <span>{row.original.tiers?.name ?? "—"}</span>
      );
    },
  },
  {
    id: "points",
    accessorKey: "points",
    header: "Current Points",
    cell({ row }) {
      return <span>{row.original.points.toLocaleString()}</span>;
    },
  },
  {
    id: "lifetime_points",
    accessorKey: "lifetime_points",
    header: "Lifetime Points",
    cell({ row }) {
      return <span>{row.original.lifetime_points.toLocaleString()}</span>;
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
            className="border-none bg-transparent shadow-none"
            onClick={() => onEdit(row.original.id)}
          >
            <Pencil className="h-4 w-4" />
          </BaseButton>
          <BaseButton
            variant={"outline"}
            className="border-none bg-transparent shadow-none"
            onClick={() => onDelete(row.original.id)}
          >
            <Trash2 className="h-4 w-4" />
          </BaseButton>
        </div>
      );
    },
    meta: {
      className: "w-24",
    },
  },
];
