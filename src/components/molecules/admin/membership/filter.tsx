"use client";

import { useMemo } from "react";
import { BaseButton } from "@/src/components/atoms/button";
import { Plus } from "lucide-react";
import TableFilter, { FilterConfig } from "../../global/table-filter";
import TableExport from "../../global/table-export";
import type { ExportFormat } from "@/src/utils/export-data";
import { useTierOptionsQuery } from "@/src/services/query/admin/membership/list";

interface Props {
  onCreate: () => void;
  onExport: (format: ExportFormat) => void;
  filterValues: Record<string, string>;
  onApplyFilter: (values: Record<string, string>) => void;
  onResetFilter: () => void;
}

const MembershipTableHeaderFilter = ({
  onCreate,
  onExport,
  filterValues,
  onApplyFilter,
  onResetFilter,
}: Props) => {
  const { data: tierOptions } = useTierOptionsQuery();

  const filterConfig = useMemo<FilterConfig[]>(
    () => [
      {
        key: "tier_id",
        label: "Tier",
        type: "select",
        options: [
          { label: "All Tiers", value: "ALL" },
          ...(tierOptions ?? []).map((tier) => ({
            label: tier.name,
            value: tier.id,
          })),
        ],
      },
    ],
    [tierOptions],
  );

  return (
    <div className="flex shrink-0 flex-wrap justify-end gap-2.5">
      <TableFilter
        configs={filterConfig}
        values={filterValues}
        onApply={onApplyFilter}
        onReset={onResetFilter}
      />
      <TableExport onExport={onExport} />
      <BaseButton
        type="button"
        className="h-12 cursor-pointer px-5 shadow-sm"
        onClick={onCreate}
      >
        <div className="flex items-center gap-2">
          <Plus aria-hidden="true" className="h-4 w-4" />
          New Membership
        </div>
      </BaseButton>
    </div>
  );
};

export default MembershipTableHeaderFilter;
