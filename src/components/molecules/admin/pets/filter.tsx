"use client";

import { BaseButton } from "@/src/components/atoms/button";
import { PawPrint } from "lucide-react";
import { useManagePetQueryStore } from "@/src/store/admin/pets/query";
import TableFilter, { FilterConfig } from "../../global/table-filter";
import TableExport from "../../global/table-export";
import type { ExportFormat } from "@/src/utils/export-data";

interface Props {
  onCreate: () => void;
  onExport: (format: ExportFormat) => void;
}

const PET_FILTER_CONFIG: FilterConfig[] = [
  {
    key: "species",
    label: "Species",
    type: "select",
    options: [
      { label: "All Species", value: "ALL" },
      { label: "Anjing (Dog)", value: "Anjing" },
      { label: "Kucing (Cat)", value: "Kucing" },
      { label: "Kelinci (Rabbit)", value: "Kelinci" },
      { label: "Burung (Bird)", value: "Burung" },
    ],
  },
  {
    key: "is_neutered",
    label: "Sterilization Status",
    type: "select",
    options: [
      { label: "All Status", value: "ALL" },
      { label: "Neutered / Spayed", value: "true" },
      { label: "Not Neutered", value: "false" },
    ],
  },
];

const PetTableHeaderFilter = ({ onCreate, onExport }: Props) => {
  const { petQuery, setPetQuery } = useManagePetQueryStore();

  const handleApplyFilter = (values: Record<string, any>) => {
    setPetQuery({
      species: values.species === "ALL" ? undefined : values.species,
      is_neutered:
        values.is_neutered === "ALL" || values.is_neutered === undefined
          ? undefined
          : values.is_neutered === "true",
      page: 1,
    });
  };

  return (
    <div className="flex shrink-0 flex-wrap justify-end gap-2.5">
      <TableFilter
        configs={PET_FILTER_CONFIG}
        values={{
          species: petQuery.species ?? "ALL",
          is_neutered:
            petQuery.is_neutered === undefined
              ? "ALL"
              : String(petQuery.is_neutered),
        }}
        onApply={handleApplyFilter}
        onReset={() =>
          setPetQuery({ species: undefined, is_neutered: undefined, page: 1 })
        }
      />

      <TableExport onExport={onExport} />

      <BaseButton
        type="button"
        className="h-12 cursor-pointer px-5 shadow-sm"
        onClick={onCreate}
      >
        <div className="flex items-center gap-2">
          <PawPrint aria-hidden="true" className="h-4 w-4" />
          Register Pet
        </div>
      </BaseButton>
    </div>
  );
};

export default PetTableHeaderFilter;
