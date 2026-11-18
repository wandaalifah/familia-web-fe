"use client";

import { BaseButton } from "@/src/components/atoms/button";
import { Plus } from "lucide-react";
import TiersTableHeaderSearch from "./search";
import TableExport from "../../global/table-export";
import type { ExportFormat } from "@/src/utils/export-data";

interface Props {
  onCreate: () => void;
  onSearchChange: (value: string) => void;
  onExport: (format: ExportFormat) => void;
}

const TiersTableHeader = ({ onCreate, onSearchChange, onExport }: Props) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <TiersTableHeaderSearch onSearchChange={onSearchChange} />
      <div className="flex shrink-0 justify-end gap-2.5">
        <TableExport onExport={onExport} />
        <BaseButton
          type="button"
          className="h-12 cursor-pointer px-5 shadow-sm"
          onClick={onCreate}
        >
          <div className="flex items-center gap-2">
            <Plus aria-hidden="true" className="h-4 w-4" />
            New Tier
          </div>
        </BaseButton>
      </div>
    </div>
  );
};

export default TiersTableHeader;
