import MembershipTableHeaderFilter from "./filter";
import MembershipTableHeaderSearch from "./search";
import type { ExportFormat } from "@/src/utils/export-data";

interface Props {
  onCreate: () => void;
  onExport: (format: ExportFormat) => void;
  filterValues: Record<string, string>;
  onApplyFilter: (values: Record<string, string>) => void;
  onResetFilter: () => void;
}

const MembershipTableHeader = ({
  onCreate,
  onExport,
  filterValues,
  onApplyFilter,
  onResetFilter,
}: Props) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <MembershipTableHeaderSearch />
      <MembershipTableHeaderFilter
        onCreate={onCreate}
        onExport={onExport}
        filterValues={filterValues}
        onApplyFilter={onApplyFilter}
        onResetFilter={onResetFilter}
      />
    </div>
  );
};

export default MembershipTableHeader;
