"use client";

import { IRedemption } from "@/src/interfaces/admin/coupons/list";
import { ColumnDef } from "@tanstack/react-table";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export const getColumnsRedemptionHistory = (): ColumnDef<IRedemption>[] => [
  {
    id: "created_at",
    accessorKey: "created_at",
    header: "Redemption Date",
    cell({ row }) {
      return (
        <span className="whitespace-nowrap tabular-nums text-[#6B7280]">
          {dateFormatter.format(new Date(row.original.created_at))}
        </span>
      );
    },
  },
  {
    id: "customer",
    header: "Customer Name & Phone",
    cell({ row }) {
      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-[#1A1A1A]">
            {row.original.users.first_name} {row.original.users.last_name}
          </span>
          <span className="text-xs text-[#6B7280]">
            {row.original.users.phone}
          </span>
        </div>
      );
    },
  },
  {
    id: "coupon_title",
    accessorKey: "coupon.title",
    header: "Coupon Redeemed",
    cell({ row }) {
      return <span className="text-[#1A1A1A]">{row.original.coupon.title}</span>;
    },
  },
  {
    id: "points_spent",
    accessorKey: "points_spent",
    header: "Points Spent",
    cell({ row }) {
      return (
        <span className="font-medium tabular-nums text-rose-700">
          -{row.original.points_spent.toLocaleString()}
        </span>
      );
    },
  },
];
