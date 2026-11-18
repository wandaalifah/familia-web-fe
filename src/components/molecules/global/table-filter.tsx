"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BaseSelect,
  BaseSelectContent,
  BaseSelectItem,
  BaseSelectTrigger,
  BaseSelectValue,
} from "@/src/components/atoms/select";
import { BaseButton } from "@/src/components/atoms/button";

export interface FilterOption {
  label: string;
  value: string;
}

export type FilterConfig =
  | { key: string; label: string; type: "select"; options: FilterOption[] }
  | { key: string; label: string; type: "date-range" }
  | { key: string; label: string; type: "number-range" };

interface Props {
  configs: FilterConfig[];
  /** Current value per config key (for "date-range", pass startDate/endDate separately). */
  values: Record<string, string>;
  onApply: (values: Record<string, string>) => void;
  onReset: () => void;
}

const countActiveFilters = (
  configs: FilterConfig[],
  values: Record<string, string>,
): number => {
  let count = 0;
  for (const config of configs) {
    if (config.type === "select") {
      if (values[config.key] && values[config.key] !== "ALL") count += 1;
    } else if (config.type === "date-range") {
      if (values.startDate || values.endDate) count += 1;
    } else {
      if (values.minValue || values.maxValue) count += 1;
    }
  }
  return count;
};

const TableFilter = ({ configs, values, onApply, onReset }: Props) => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>(values);

  const handleOpen = () => {
    setDraft(values);
    setOpen((prev) => !prev);
  };

  const activeCount = countActiveFilters(configs, values);

  const handleApply = () => {
    onApply(draft);
    setOpen(false);
  };

  const handleReset = () => {
    onReset();
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleOpen}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="relative flex h-12 cursor-pointer items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-4 text-sm font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A]"
      >
        <Filter aria-hidden="true" className="h-4 w-4" />
        Filter
        {activeCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1A1A1A] px-1 text-[11px] font-semibold text-white">
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            aria-hidden="true"
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-label="Filter options"
            className="absolute right-0 z-20 mt-2 w-72 rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-lg"
          >
            <div className="grid gap-4">
              {configs.map((config) => (
                <div key={config.key} className="grid gap-1.5">
                  <label
                    htmlFor={`filter-${config.key}`}
                    className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]"
                  >
                    {config.label}
                  </label>

                  {config.type === "select" ? (
                    <BaseSelect
                      value={draft[config.key] ?? "ALL"}
                      onValueChange={(value) =>
                        setDraft((prev) => ({ ...prev, [config.key]: value as string }))
                      }
                    >
                      <BaseSelectTrigger
                        id={`filter-${config.key}`}
                        className="h-10 w-full border-[#D1D5DB] text-sm"
                      >
                        <BaseSelectValue>
                          {(value) =>
                            config.options.find((opt) => opt.value === value)?.label ??
                            config.options[0]?.label
                          }
                        </BaseSelectValue>
                      </BaseSelectTrigger>
                      <BaseSelectContent>
                        {config.options.map((opt) => (
                          <BaseSelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </BaseSelectItem>
                        ))}
                      </BaseSelectContent>
                    </BaseSelect>
                  ) : config.type === "date-range" ? (
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        id={`filter-${config.key}`}
                        type="date"
                        aria-label={`${config.label} start`}
                        value={draft.startDate ?? ""}
                        onChange={(e) =>
                          setDraft((prev) => ({ ...prev, startDate: e.target.value }))
                        }
                        className="h-10 rounded-lg border border-[#D1D5DB] px-2.5 text-sm text-[#1A1A1A]"
                      />
                      <input
                        type="date"
                        aria-label={`${config.label} end`}
                        value={draft.endDate ?? ""}
                        onChange={(e) =>
                          setDraft((prev) => ({ ...prev, endDate: e.target.value }))
                        }
                        className="h-10 rounded-lg border border-[#D1D5DB] px-2.5 text-sm text-[#1A1A1A]"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        id={`filter-${config.key}`}
                        type="number"
                        min={0}
                        placeholder="Min"
                        aria-label={`${config.label} minimum`}
                        value={draft.minValue ?? ""}
                        onChange={(e) =>
                          setDraft((prev) => ({ ...prev, minValue: e.target.value }))
                        }
                        className="h-10 rounded-lg border border-[#D1D5DB] px-2.5 text-sm text-[#1A1A1A]"
                      />
                      <input
                        type="number"
                        min={0}
                        placeholder="Max"
                        aria-label={`${config.label} maximum`}
                        value={draft.maxValue ?? ""}
                        onChange={(e) =>
                          setDraft((prev) => ({ ...prev, maxValue: e.target.value }))
                        }
                        className="h-10 rounded-lg border border-[#D1D5DB] px-2.5 text-sm text-[#1A1A1A]"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end gap-2 border-t border-[#F0EEE9] pt-3">
              <BaseButton
                type="button"
                variant="outline"
                className={cn("h-9 px-4 text-sm")}
                onClick={handleReset}
              >
                Reset
              </BaseButton>
              <BaseButton
                type="button"
                className="h-9 px-4 text-sm"
                onClick={handleApply}
              >
                Apply Filter
              </BaseButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TableFilter;
