"use client";

import { BaseButton } from "@/src/components/atoms/button";
import { Stethoscope } from "lucide-react";
import { useManageMedicalRecordQueryStore } from "@/src/store/admin/medical-records/query";
import TableFilter, { FilterConfig } from "../../global/table-filter";
import TableExport from "../../global/table-export";
import type { ExportFormat } from "@/src/utils/export-data";

interface Props {
  onCreate: () => void;
  onExport: (format: ExportFormat) => void;
}

const MEDICAL_FILTER_CONFIG: FilterConfig[] = [
  {
    key: "type",
    label: "Service Type",
    type: "select",
    options: [
      { label: "All Types", value: "ALL" },
      { label: "Vaccine", value: "VACCINE" },
      { label: "Deworming (Obat Cacing & Kutu)", value: "DEWORMING" },
      { label: "Grooming", value: "GROOMING" },
      { label: "Rawat Inap (Inpatient)", value: "RAWAT_INAP" },
      { label: "Rawat Jalan (Outpatient)", value: "RAWAT_JALAN" },
    ],
  },
  {
    key: "dateRange",
    label: "Administered Date",
    type: "date-range",
  },
];

const MedicalRecordTableHeaderFilter = ({ onCreate, onExport }: Props) => {
  const { medicalQuery, setMedicalQuery } = useManageMedicalRecordQueryStore();

  const handleApplyFilter = (values: Record<string, any>) => {
    setMedicalQuery({
      type: values.type === "ALL" ? undefined : values.type,
      startDate: values.startDate || undefined,
      endDate: values.endDate || undefined,
      page: 1,
    });
  };

  return (
    <div className="flex shrink-0 flex-wrap justify-end gap-2.5">
      <TableFilter
        configs={MEDICAL_FILTER_CONFIG}
        values={{
          type: medicalQuery.type ?? "ALL",
          startDate: medicalQuery.startDate ?? "",
          endDate: medicalQuery.endDate ?? "",
        }}
        onApply={handleApplyFilter}
        onReset={() =>
          setMedicalQuery({
            type: undefined,
            startDate: undefined,
            endDate: undefined,
            page: 1,
          })
        }
      />

      <TableExport onExport={onExport} />

      <BaseButton
        type="button"
        className="h-12 cursor-pointer px-5 shadow-sm"
        onClick={onCreate}
      >
        <div className="flex items-center gap-2">
          <Stethoscope aria-hidden="true" className="h-4 w-4" />
          New Record
        </div>
      </BaseButton>
    </div>
  );
};

export default MedicalRecordTableHeaderFilter;
