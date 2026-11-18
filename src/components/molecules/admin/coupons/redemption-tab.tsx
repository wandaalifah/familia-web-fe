"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import debounce from "lodash/debounce";
import { BaseInput } from "@/src/components/atoms/input";
import { DataTable } from "../../global/table";
import TableFilter, { FilterConfig } from "../../global/table-filter";
import TableExport from "../../global/table-export";
import { exportData, dateStamp, ExportFormat } from "@/src/utils/export-data";
import { getColumnsRedemptionHistory } from "./column-redemption";
import { useManageRedemptionQueryStore } from "@/src/store/admin/coupons/query";
import { useRedemptionListQuery } from "@/src/services/query/admin/coupons/list";

const REDEMPTION_FILTER_CONFIG: FilterConfig[] = [
  { key: "dateRange", label: "Redemption Date", type: "date-range" },
];

const RedemptionHistoryTab = () => {
  const { redemptionQuery, setRedemptionQuery } = useManageRedemptionQueryStore();
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState<Record<string, string>>({});

  const { data, isLoading } = useRedemptionListQuery(redemptionQuery);
  const rows = useMemo(() => data?.items ?? [], [data]);

  const debouncedSearch = useMemo(() => debounce(setSearch, 500), []);

  // The redemptions endpoint has no text-search or date-range query param,
  // so both filters below are applied client-side over the loaded page.
  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return rows.filter((row) => {
      if (query) {
        const customerName = `${row.users.first_name} ${row.users.last_name}`.toLowerCase();
        if (
          !customerName.includes(query) &&
          !row.coupon.title.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      const time = new Date(row.created_at).getTime();
      if (dateFilter.startDate && time < new Date(dateFilter.startDate).getTime()) {
        return false;
      }
      if (
        dateFilter.endDate &&
        time > new Date(dateFilter.endDate).getTime() + 86_400_000 - 1
      ) {
        return false;
      }

      return true;
    });
  }, [rows, search, dateFilter]);

  const handleExport = (format: ExportFormat) => {
    exportData(
      filteredRows,
      [
        {
          header: "Redemption Date",
          accessor: (row) => new Date(row.created_at).toISOString(),
        },
        {
          header: "Customer Name",
          accessor: (row) => `${row.users.first_name} ${row.users.last_name}`,
        },
        { header: "Customer Phone", accessor: (row) => row.users.phone },
        { header: "Coupon Redeemed", accessor: (row) => row.coupon.title },
        { header: "Points Spent", accessor: (row) => row.points_spent },
      ],
      `vet-clinic-redemptions-${dateStamp()}`,
      format,
    );
  };

  const columns = useMemo(() => getColumnsRedemptionHistory(), []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xl">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]"
          />
          <BaseInput
            type="search"
            aria-label="Search redemption history"
            placeholder="Search by customer or coupon…"
            onChange={(e) => debouncedSearch(e.target.value)}
            className="h-12 rounded-lg border border-[#E5E7EB] bg-white pl-10 text-sm text-[#1A1A1A] shadow-sm placeholder:text-[#9CA3AF] focus-visible:border-[#1A1A1A] focus-visible:ring-[#d6c3a5]/50"
          />
        </div>
        <div className="flex shrink-0 justify-end gap-2.5">
          <TableFilter
            configs={REDEMPTION_FILTER_CONFIG}
            values={dateFilter}
            onApply={setDateFilter}
            onReset={() => setDateFilter({})}
          />
          <TableExport onExport={handleExport} />
        </div>
      </div>

      <DataTable
        containerClassName="max-h-[calc(100vh-320px)] overflow-y-auto"
        columns={columns}
        data={filteredRows}
        rowId="id"
        isLoading={isLoading}
        pagination={data?.pagination ?? undefined}
        onPageChange={(page) => setRedemptionQuery({ page })}
      />
    </div>
  );
};

export default RedemptionHistoryTab;
