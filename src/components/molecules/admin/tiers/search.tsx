"use client";

import { useMemo } from "react";
import debounce from "lodash/debounce";
import { Search } from "lucide-react";
import { BaseInput } from "@/src/components/atoms/input";

interface Props {
  onSearchChange: (value: string) => void;
}

const TiersTableHeaderSearch = ({ onSearchChange }: Props) => {
  const debouncedSearchChange = useMemo(
    () => debounce(onSearchChange, 500),
    [onSearchChange],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearchChange(e.target.value);
  };

  return (
    <div className="relative w-full sm:max-w-xl">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]"
      />
      <BaseInput
        type="search"
        aria-label="Search tiers"
        placeholder="Search by tier name…"
        onChange={handleInputChange}
        className="h-12 rounded-lg border border-[#E5E7EB] bg-white pl-10 text-sm text-[#1A1A1A] shadow-sm placeholder:text-[#9CA3AF] focus-visible:border-[#1A1A1A] focus-visible:ring-[#d6c3a5]/50"
      />
    </div>
  );
};

export default TiersTableHeaderSearch;
