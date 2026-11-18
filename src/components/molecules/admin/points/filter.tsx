"use client";

import { BaseButton } from "@/src/components/atoms/button";
import { Coins } from "lucide-react";
import TableFilter, { FilterConfig } from "../../global/table-filter";
import TableExport from "../../global/table-export";
import type { ExportFormat } from "@/src/utils/export-data";

interface Props {
  onAdjust: () => void;
  onExport: (format: ExportFormat) => void;
  filterValues: Record<string, string>;
  onApplyFilter: (values: Record<string, string>) => void;
  onResetFilter: () => void;
}

const POINTS_FILTER_CONFIG: FilterConfig[] = [
  {
    key: "type",
    label: "Transaction Type",
    type: "select",
    options: [
      { label: "All Types", value: "ALL" },
      { label: "Earned", value: "EARNED" },
      { label: "Redeemed", value: "REDEEMED" },
      { label: "Adjustment", value: "ADJUSTMENT" },
    ],
  },
  {
    key: "dateRange",
    label: "Transaction Date",
    type: "date-range",
  },
];

const PointsTableHeaderFilter = ({
  onAdjust,
  onExport,
  filterValues,
  onApplyFilter,
  onResetFilter,
}: Props) => {
  return (
    <div className="flex shrink-0 flex-wrap justify-end gap-2.5">
      <TableFilter
        configs={POINTS_FILTER_CONFIG}
        values={filterValues}
        onApply={onApplyFilter}
        onReset={onResetFilter}
      />
      <TableExport onExport={onExport} />
      <BaseButton
        type="button"
        className="h-12 cursor-pointer px-5 shadow-sm"
        onClick={onAdjust}
      >
        <div className="flex items-center gap-2">
          <Coins aria-hidden="true" className="h-4 w-4" />
          Adjust / Add Points
        </div>
      </BaseButton>
    </div>
  );
};

export default PointsTableHeaderFilter;
