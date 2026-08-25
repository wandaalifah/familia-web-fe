"use client";

import { DataTable } from "../../global/table";
import CouponsTableHeader from "./table-header";
import { useManageCouponsQueryStore } from "@/src/store/admin/rewards/query";
import { useShallow } from "zustand/shallow";
import { useMemo } from "react";
import { getColumnsManageCoupons } from "./column";
import { ICouponItem } from "@/src/interfaces/admin/rewards/list";

const dummyData: ICouponItem[] = [
  {
    id: "rwd-001",
    title: "Free Grooming Session",
    description: "One free basic grooming session for your pet",
    points_cost: 500,
    created_at: new Date("2025-01-15"),
    updated_at: new Date("2025-06-20"),
  },
  {
    id: "rwd-002",
    title: "Pet Food Discount",
    description: "20% discount on selected pet food brands",
    points_cost: 300,
    created_at: new Date("2025-02-10"),
    updated_at: new Date("2025-07-15"),
  },
  {
    id: "rwd-003",
    title: "Veterinary Checkup",
    description: "Free basic health checkup for your pet",
    points_cost: 800,
    created_at: new Date("2025-03-05"),
    updated_at: new Date("2025-08-01"),
  },
  {
    id: "rwd-004",
    title: "Pet Toy Bundle",
    description: null,
    points_cost: 200,
    created_at: new Date("2025-04-20"),
    updated_at: new Date("2025-08-10"),
  },
];

const CouponsTable = () => {
  const { couponsQuery, setCouponsQuery } = useManageCouponsQueryStore(
    useShallow(({ couponsQuery, setCouponsQuery }) => ({
      couponsQuery,
      setCouponsQuery,
    }))
  );

  const columns = useMemo(
    () =>
      getColumnsManageCoupons({
        onEdit: () => {},
        onDelete: () => {},
      }),
    []
  );

  const onPageChange = (page: number) => {
    setCouponsQuery({
      ...couponsQuery,
      page,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <CouponsTableHeader />
      <DataTable
        containerClassName="max-h-[calc(100vh-280px)] overflow-y-auto"
        columns={columns}
        data={dummyData}
        pagination={{
          current_page: 1,
          total_page: 1,
          total_data: dummyData.length,
          limit: 10,
          next: null,
          prev: null,
        }}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default CouponsTable;
