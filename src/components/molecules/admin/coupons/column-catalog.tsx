"use client";

import { ICoupon } from "@/src/interfaces/admin/coupons/list";
import { ColumnDef } from "@tanstack/react-table";
import { BaseButton } from "@/src/components/atoms/button";
import { Pencil, Ticket, Trash2 } from "lucide-react";

interface Props {
  onRedeem: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export const getColumnsCouponCatalog = ({
  onRedeem,
  onEdit,
  onDelete,
}: Props): ColumnDef<ICoupon>[] => [
  {
    id: "title",
    accessorKey: "title",
    header: "Coupon Title",
    cell({ row }) {
      return (
        <span className="font-medium text-[#1A1A1A]">{row.original.title}</span>
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
          className="block max-w-sm truncate text-[#6B7280]"
        >
          {row.original.description}
        </span>
      );
    },
    meta: { className: "max-w-sm" },
  },
  {
    id: "points_cost",
    accessorKey: "points_cost",
    header: "Points Cost",
    cell({ row }) {
      return (
        <span className="inline-flex items-center rounded-full bg-[#d6c3a5]/30 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-[#5C4A2A]">
          {row.original.points_cost.toLocaleString()} pts
        </span>
      );
    },
  },
  {
    id: "total_redeemed",
    accessorKey: "_count.redemptions",
    header: "Total Redeemed",
    cell({ row }) {
      return (
        <span className="tabular-nums text-[#6B7280]">
          {row.original._count.redemptions.toLocaleString()}
        </span>
      );
    },
  },
  {
    id: "created_at",
    accessorKey: "created_at",
    header: "Created At",
    cell({ row }) {
      return (
        <span className="tabular-nums text-[#6B7280]">
          {dateFormatter.format(new Date(row.original.created_at))}
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
            title="Redeem for Customer"
            aria-label={`Redeem ${row.original.title} for a customer`}
            className="h-9 w-9 cursor-pointer border-none bg-transparent p-0 text-[#6B7280] shadow-none hover:bg-[#F3F4F6] hover:text-[#5C4A2A]"
            onClick={() => onRedeem(row.original.id)}
          >
            <Ticket aria-hidden="true" className="h-4 w-4" />
          </BaseButton>
          <BaseButton
            variant={"outline"}
            aria-label={`Edit ${row.original.title} coupon`}
            className="h-9 w-9 cursor-pointer border-none bg-transparent p-0 text-[#6B7280] shadow-none hover:bg-[#F3F4F6] hover:text-[#1A1A1A]"
            onClick={() => onEdit(row.original.id)}
          >
            <Pencil aria-hidden="true" className="h-4 w-4" />
          </BaseButton>
          <BaseButton
            variant={"outline"}
            aria-label={`Delete ${row.original.title} coupon`}
            className="h-9 w-9 cursor-pointer border-none bg-transparent p-0 text-[#6B7280] shadow-none hover:bg-[#FEF2F2] hover:text-[#DC2626]"
            onClick={() => onDelete(row.original.id)}
          >
            <Trash2 aria-hidden="true" className="h-4 w-4" />
          </BaseButton>
        </div>
      );
    },
    meta: { className: "w-32" },
  },
];
