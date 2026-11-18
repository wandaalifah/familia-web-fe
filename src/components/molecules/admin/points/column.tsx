"use client";

import {
  IPointTransaction,
  PointTransactionType,
} from "@/src/interfaces/admin/points/list";
import { ColumnDef } from "@tanstack/react-table";
import { TrendingDown, TrendingUp, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SortableField,
  SortableHeader,
  SortOrder,
} from "@/src/components/atoms/table/sortable-header";

interface Props {
  sortBy: SortableField;
  sortOrder: SortOrder;
  onSort: (field: SortableField, order: SortOrder) => void;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const TYPE_BADGE: Record<
  PointTransactionType,
  { label: string; className: string; icon: typeof TrendingUp }
> = {
  EARNED: {
    label: "Earned",
    className: "bg-emerald-50 text-emerald-700",
    icon: TrendingUp,
  },
  REDEEMED: {
    label: "Redeemed",
    className: "bg-sky-50 text-sky-700",
    icon: TrendingDown,
  },
  ADJUSTMENT: {
    label: "Adjustment",
    className: "bg-amber-50 text-amber-800",
    icon: Wrench,
  },
};

export const getColumnsManagePoints = ({
  sortBy,
  sortOrder,
  onSort,
}: Props): ColumnDef<IPointTransaction>[] => [
  {
    id: "id",
    accessorKey: "id",
    header: () => <SortableHeader label="ID" field="id" sortable={false} />,
    cell({ row }) {
      return <span className="text-xs text-[#6B7280]">{row.original.id}</span>;
    },
  },
  {
    id: "type",
    accessorKey: "type",
    header: () => (
      <SortableHeader
        label="Type"
        field="type"
        currentSortField={sortBy}
        currentSortOrder={sortOrder}
        onSort={onSort}
      />
    ),
    cell({ row }) {
      const badge = TYPE_BADGE[row.original.type];
      const Icon = badge.icon;
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
            badge.className,
          )}
        >
          <Icon aria-hidden="true" className="h-3 w-3" />
          {badge.label}
        </span>
      );
    },
  },
  {
    id: "description",
    accessorKey: "description",
    header: () => (
      <SortableHeader label="Description" field="description" sortable={false} />
    ),
    cell({ row }) {
      return (
        <span
          title={row.original.description}
          className="block max-w-xs truncate text-[#1A1A1A]"
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
    id: "amount",
    accessorKey: "amount",
    header: () => (
      <SortableHeader
        label="Amount"
        field="amount"
        currentSortField={sortBy}
        currentSortOrder={sortOrder}
        onSort={onSort}
      />
    ),
    cell({ row }) {
      // Amount is stored signed: positive credits the member's balance,
      // negative debits it (redemptions and negative adjustments).
      const { amount } = row.original;
      const colorClass = amount >= 0 ? "text-emerald-700" : "text-rose-700";
      return (
        <span className={cn("font-semibold tabular-nums", colorClass)}>
          {amount >= 0 ? "+" : ""}
          {amount.toLocaleString()}
        </span>
      );
    },
  },
  {
    id: "user_name",
    accessorKey: "membership.users.first_name",
    header: () => (
      <SortableHeader label="Member" field="user_name" sortable={false} />
    ),
    cell({ row }) {
      const { users } = row.original.membership;
      return (
        <span>
          {users.first_name} {users.last_name}
        </span>
      );
    },
  },
  {
    id: "transaction_date",
    accessorKey: "created_at",
    header: () => (
      <SortableHeader
        label="Date"
        field="created_at"
        currentSortField={sortBy}
        currentSortOrder={sortOrder}
        onSort={onSort}
      />
    ),
    cell({ row }) {
      return (
        <span className="tabular-nums text-[#6B7280]">
          {dateFormatter.format(new Date(row.original.created_at))}
        </span>
      );
    },
  },
];
