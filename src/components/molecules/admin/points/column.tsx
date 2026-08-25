"use client";

import { IPointsHistoryItem } from "@/src/interfaces/admin/points/list";
import { ColumnDef } from "@tanstack/react-table";

export const getColumnsManagePoints = (): ColumnDef<IPointsHistoryItem>[] => [
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
    id: "type",
    accessorKey: "type",
    header: "Type",
    cell({ row }) {
      return <span>{row.original.type}</span>;
    },
  },
  {
    id: "amount",
    accessorKey: "amount",
    header: "Amount",
    cell({ row }) {
      return <span>{row.original.amount.toLocaleString()}</span>;
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
    id: "user",
    accessorKey: "membership.users.first_name",
    header: "User",
    cell({ row }) {
      const { first_name, last_name } = row.original.membership.users;
      return <span>{`${first_name} ${last_name}`}</span>;
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
];
