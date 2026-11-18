"use client";

import { useManagePetQueryStore } from "@/src/store/admin/pets/query";
import { useState } from "react";
import SearchWithFilter from "../../SearchWithFilter";

const PetTableHeaderSearch = () => {
  const { petQuery, setPetQuery } = useManagePetQueryStore();

  const [searchBy, setSearchBy] = useState<string>(petQuery.search_by || "name");

  const searchByOption = [
    { value: "name", label: "Pet Name" },
    { value: "species", label: "Species" },
    { value: "breed", label: "Breed" },
    { value: "owner", label: "Owner (name or phone)" },
  ];

  const handleSearch = (value: string) => {
    setPetQuery({
      search_by: searchBy as any,
      search: value || undefined,
      page: 1,
    });
  };

  const handleSearchBy = (val: string) => {
    setSearchBy(val);
    setPetQuery({
      search_by: val as any,
      search: petQuery.search,
      page: 1,
    });
  };

  return (
    <SearchWithFilter
      searchByOptions={searchByOption}
      selectedSearchBy={searchBy}
      onSearchByChange={handleSearchBy}
      onSearchChange={handleSearch}
      searchPlaceholder="Search pets or owners..."
      searchByPlaceholder="Search By"
      className="w-full rounded-lg border border-[#E5E7EB] shadow-sm sm:max-w-xl"
      debounceMs={500}
      selectWidth="w-36"
    />
  );
};

export default PetTableHeaderSearch;
