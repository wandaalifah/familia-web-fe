import PetTableHeaderFilter from "./filter";
import PetTableHeaderSearch from "./search";
import type { ExportFormat } from "@/src/utils/export-data";

interface Props {
  onCreate: () => void;
  onExport: (format: ExportFormat) => void;
}

const PetTableHeader = ({ onCreate, onExport }: Props) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <PetTableHeaderSearch />
      <PetTableHeaderFilter onCreate={onCreate} onExport={onExport} />
    </div>
  );
};

export default PetTableHeader;
