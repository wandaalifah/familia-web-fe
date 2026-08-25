"use client";

import { useManageCouponsQueryStore } from "@/src/store/admin/rewards/query";
import { useState } from "react";
import SearchWithFilter from "../../SearchWithFilter";

const CouponsTableHeaderSearch = () => {
  const { couponsQuery, setCouponsQuery } = useManageCouponsQueryStore();

  const [searchBy, setSearchBy] = useState<string>(
    couponsQuery.search_by || ""
  );

  const searchByOption = [
    { value: "title", label: "Title" },
    { value: "description", label: "Description" },
  ];

  const handleSearch = (value: string) => {
    if (!searchBy) return;

    setCouponsQuery({
      search_by: searchBy as any,
      search: value || undefined,
      page: 1,
    });
  };

  const handleSearchBy = (val: string) => {
    setSearchBy(val);
    setCouponsQuery({
      search_by: val as any,
      search: couponsQuery.search,
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

export default CouponsTableHeaderSearch;
