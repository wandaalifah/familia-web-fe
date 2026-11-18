"use client";

import { useManageMedicalRecordQueryStore } from "@/src/store/admin/medical-records/query";
import { IGetListMedicalRecordQuery } from "@/src/interfaces/admin/medical-records/list";
import { useState } from "react";
import SearchWithFilter from "../../SearchWithFilter";

type SearchByField = NonNullable<IGetListMedicalRecordQuery["search_by"]>;

const isSearchByField = (value: string): value is SearchByField =>
  ["title", "diagnosis", "vaccine_name", "doctor_name"].includes(value);

const MedicalRecordTableHeaderSearch = () => {
  const { medicalQuery, setMedicalQuery } = useManageMedicalRecordQueryStore();

  const [searchBy, setSearchBy] = useState<SearchByField>(
    medicalQuery.search_by || "title",
  );

  const searchByOption = [
    { value: "title", label: "Title" },
    { value: "diagnosis", label: "Diagnosis" },
    { value: "vaccine_name", label: "Vaccine Name" },
    { value: "doctor_name", label: "Doctor Name" },
  ];

  const handleSearch = (value: string) => {
    setMedicalQuery({
      search_by: searchBy,
      search: value || undefined,
      page: 1,
    });
  };

  const handleSearchBy = (val: string) => {
    if (!isSearchByField(val)) return;
    setSearchBy(val);
    setMedicalQuery({
      search_by: val,
      search: medicalQuery.search,
      page: 1,
    });
  };

  return (
    <SearchWithFilter
      searchByOptions={searchByOption}
      selectedSearchBy={searchBy}
      onSearchByChange={handleSearchBy}
      onSearchChange={handleSearch}
      searchPlaceholder="Search records..."
      searchByPlaceholder="Search By"
      className="w-full rounded-lg border border-[#E5E7EB] shadow-sm sm:max-w-xl"
      debounceMs={500}
      selectWidth="w-36"
    />
  );
};

export default MedicalRecordTableHeaderSearch;
