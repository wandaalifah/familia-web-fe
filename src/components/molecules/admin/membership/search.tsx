"use client";

import { useManageMembershipQueryStore } from "@/src/store/admin/membership/query";
import { useState } from "react";
import SearchWithFilter from "../../SearchWithFilter";

const MembershipTableHeaderSearch = () => {
  const { membershipQuery, setMembershipQuery } =
    useManageMembershipQueryStore();

  const [searchBy, setSearchBy] = useState<string>(
    membershipQuery.search_by || ""
  );

  const searchByOption = [
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
  ];

  const handleSearch = (value: string) => {
    if (!searchBy) return;

    setMembershipQuery({
      search_by: searchBy as any,
      search: value || undefined,
      page: 1,
    });
  };

  const handleSearchBy = (val: string) => {
    setSearchBy(val);
    setMembershipQuery({
        search_by: val as any,
        search: membershipQuery.search,
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

export default MembershipTableHeaderSearch;