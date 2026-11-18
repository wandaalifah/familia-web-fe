"use client";

import { Coins, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { IPointTransaction } from "@/src/interfaces/admin/points/list";

interface Props {
  rows: IPointTransaction[];
}

interface CardDef {
  label: string;
  value: number;
  icon: typeof TrendingUp;
  iconClassName: string;
}

// Computed from the currently loaded page only — the history list is
// server-paginated and there is no dedicated summary/aggregate endpoint yet,
// so these are NOT running totals across the full ledger.
const PointsSummaryCards = ({ rows }: Props) => {
  const totalEarned = rows
    .filter((row) => row.amount > 0)
    .reduce((sum, row) => sum + row.amount, 0);
  const totalRedeemed = rows
    .filter((row) => row.amount < 0)
    .reduce((sum, row) => sum + Math.abs(row.amount), 0);
  const netActive = totalEarned - totalRedeemed;

  const cards: CardDef[] = [
    {
      label: "Points Earned (this page)",
      value: totalEarned,
      icon: TrendingUp,
      iconClassName: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Points Redeemed (this page)",
      value: totalRedeemed,
      icon: TrendingDown,
      iconClassName: "bg-rose-50 text-rose-700",
    },
    {
      label: "Net Change (this page)",
      value: netActive,
      icon: Coins,
      iconClassName: "bg-[#d6c3a5]/30 text-[#5C4A2A]",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm"
        >
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
              card.iconClassName,
            )}
          >
            <card.icon aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-medium text-[#6B7280]">{card.label}</p>
            <p className="text-lg font-semibold tabular-nums text-[#1A1A1A]">
              {card.value.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PointsSummaryCards;
