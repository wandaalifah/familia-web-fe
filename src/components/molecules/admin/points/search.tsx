"use client";

import { useManagePointsQueryStore } from "@/src/store/admin/points/query";
import { useState } from "react";
import SearchWithFilter from "../../SearchWithFilter";

const PointsTableHeaderSearch = () => {
  const { pointsQuery, setPointsQuery } = useManagePointsQueryStore();

  const [searchBy, setSearchBy] = useState<string>(
    pointsQuery.search_by || ""
  );

  const searchByOption = [
    { value: "description", label: "Description" },
    { value: "user", label: "User" },
  ];

  const handleSearch = (value: string) => {
    if (!searchBy) return;

    setPointsQuery({
      search_by: searchBy as any,
      search: value || undefined,
      page: 1,
    });
  };

  const handleSearchBy = (val: string) => {
    setSearchBy(val);
    setPointsQuery({
      search_by: val as any,
      search: pointsQuery.search,
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

export default PointsTableHeaderSearch;
