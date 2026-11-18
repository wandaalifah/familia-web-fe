"use client";

import { useState } from "react";
import SearchWithFilter from "../../SearchWithFilter";

interface Props {
  onSearchByChange: (searchBy: string) => void;
  onSearchChange: (search: string) => void;
}

const PointsTableHeaderSearch = ({ onSearchByChange, onSearchChange }: Props) => {
  const [searchBy, setSearchBy] = useState<string>("description");

  const searchByOptions = [
    { value: "description", label: "Description" },
    { value: "type", label: "Type" },
  ];

  const handleSearchBy = (value: string) => {
    setSearchBy(value);
    onSearchByChange(value);
  };

  return (
    <SearchWithFilter
      searchByOptions={searchByOptions}
      selectedSearchBy={searchBy}
      onSearchByChange={handleSearchBy}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search..."
      searchByPlaceholder="Search By"
      className="w-full border border-[#E5E7EB] rounded-lg shadow-sm sm:max-w-xl"
      debounceMs={500}
      selectWidth="w-36"
    />
  );
};

export default PointsTableHeaderSearch;
