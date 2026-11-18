"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExportFormat } from "@/src/utils/export-data";

interface Props {
  onExport: (format: ExportFormat) => void | Promise<void>;
  label?: string;
}

const TableExport = ({ onExport, label = "Export" }: Props) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport("xlsx");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      type="button"
      disabled={isExporting}
      onClick={handleExport}
      className={cn(
        "flex h-12 cursor-pointer items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-4 text-sm font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A]",
        isExporting && "cursor-not-allowed opacity-60",
      )}
    >
      {isExporting ? (
        <Loader2 aria-hidden="true" className="h-4 w-4 motion-safe:animate-spin" />
      ) : (
        <Download aria-hidden="true" className="h-4 w-4" />
      )}
      {label}
    </button>
  );
};

export default TableExport;
