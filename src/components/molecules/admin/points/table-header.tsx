"use client";

import PointsTableHeaderSearch from "./search";
import PointsTableHeaderFilter from "./filter";
import type { ExportFormat } from "@/src/utils/export-data";

interface Props {
  onAdjust: () => void;
  onSearchByChange: (searchBy: string) => void;
  onSearchChange: (search: string) => void;
  onExport: (format: ExportFormat) => void;
  filterValues: Record<string, string>;
  onApplyFilter: (values: Record<string, string>) => void;
  onResetFilter: () => void;
}

const PointsTableHeader = ({
  onAdjust,
  onSearchByChange,
  onSearchChange,
  onExport,
  filterValues,
  onApplyFilter,
  onResetFilter,
}: Props) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <PointsTableHeaderSearch
        onSearchByChange={onSearchByChange}
        onSearchChange={onSearchChange}
      />
      <PointsTableHeaderFilter
        onAdjust={onAdjust}
        onExport={onExport}
        filterValues={filterValues}
        onApplyFilter={onApplyFilter}
        onResetFilter={onResetFilter}
      />
    </div>
  );
};

export default PointsTableHeader;
