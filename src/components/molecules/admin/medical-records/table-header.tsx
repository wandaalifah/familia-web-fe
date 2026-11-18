import MedicalRecordTableHeaderFilter from "./filter";
import MedicalRecordTableHeaderSearch from "./search";
import type { ExportFormat } from "@/src/utils/export-data";

interface Props {
  onCreate: () => void;
  onExport: (format: ExportFormat) => void;
}

const MedicalRecordTableHeader = ({ onCreate, onExport }: Props) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <MedicalRecordTableHeaderSearch />
      <MedicalRecordTableHeaderFilter onCreate={onCreate} onExport={onExport} />
    </div>
  );
};

export default MedicalRecordTableHeader;
