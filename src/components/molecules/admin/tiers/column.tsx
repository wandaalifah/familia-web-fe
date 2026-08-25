"use client";

import { ITierItem } from "@/src/interfaces/admin/tiers/list";
import { ColumnDef } from "@tanstack/react-table";
import { BaseButton } from "@/src/components/atoms/button";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const getColumnsManageTiers = ({
  onEdit,
  onDelete,
}: Props): ColumnDef<ITierItem>[] => [
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
    id: "name",
    accessorKey: "name",
    header: "Name",
    cell({ row }) {
      return <span>{row.original.name}</span>;
    },
  },
  {
    id: "description",
    accessorKey: "description",
    header: "Description",
    cell({ row }) {
      return <span>{row.original.description ?? "—"}</span>;
    },
  },
  {
    id: "level",
    accessorKey: "level",
    header: "Level",
    cell({ row }) {
      return <span>{row.original.level}</span>;
    },
  },
  {
    id: "required_points",
    accessorKey: "required_points",
    header: "Required Points",
    cell({ row }) {
      return <span>{row.original.required_points.toLocaleString()}</span>;
    },
  },
  {
    id: "created_at",
    accessorKey: "created_at",
    header: "Created At",
    cell({ row }) {
      return (
        <span>
          {new Date(row.original.created_at).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      );
    },
  },
  {
    id: "updated_at",
    accessorKey: "updated_at",
    header: "Updated At",
    cell({ row }) {
      return (
        <span>
          {new Date(row.original.updated_at).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
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
            <Trash2 className="h-4 w-4 text-red-500" />
          </BaseButton>
        </div>
      );
    },
  },
];
