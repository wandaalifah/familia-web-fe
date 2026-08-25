"use client";

import { useManageTiersQueryStore } from "@/src/store/admin/tiers/query";
import { useState } from "react";
import SearchWithFilter from "../../SearchWithFilter";

const TiersTableHeaderSearch = () => {
  const { tiersQuery, setTiersQuery } = useManageTiersQueryStore();

  const [searchBy, setSearchBy] = useState<string>(
    tiersQuery.search_by || ""
  );

  const searchByOption = [
    { value: "name", label: "Name" },
    { value: "description", label: "Description" },
  ];

  const handleSearch = (value: string) => {
    if (!searchBy) return;

    setTiersQuery({
      search_by: searchBy as any,
      search: value || undefined,
      page: 1,
    });
  };

  const handleSearchBy = (val: string) => {
    setSearchBy(val);
    setTiersQuery({
      search_by: val as any,
      search: tiersQuery.search,
      page: 1,
    });
  };

  return (
    <SearchWithFilter
      searchByOptions={searchByOption}
      selectedSearchBy={searchBy}
      onSearchByChange={handleSearchBy}
      onSearchChange={handleSearch}
      searchPlaceholder="Search..."
      searchByPlaceholder="Search By"
      className="w-[40%] border rounded-lg"
      debounceMs={500}
      selectWidth="w-44"
    />
  );
};

export default TiersTableHeaderSearch;
