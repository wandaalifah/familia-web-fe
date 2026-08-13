"use client";

import { DataTable } from "../../global/table";
import MembershipTableHeader from "./table-header";
import { useManageMembershipQueryStore } from "@/src/store/admin/membership/query";
import { useShallow } from "zustand/shallow";
import { useMemo } from "react";
import { getColumnsManageMembership } from "./column";
import { IMembership } from "@/src/interfaces/admin/membership/list";

const dummyData: IMembership[] = [
  {
    id: "mbr-001",
    points: 1250,
    lifetime_points: 4800,
    created_at: new Date("2025-03-15"),
    updated_at: new Date("2026-08-01"),
    userId: "usr-001",
    tierId: "tier-002",
    users: {
      id: "usr-001",
      email: "budi.santoso@email.com",
      phone: "+6281234567890",
      first_name: "Budi",
      last_name: "Santoso",
      role: "member",
    },
    tiers: {
      id: "tier-002",
      name: "Silver",
      required_points: 1000,
    },
  },
];

const MembershipTable = () => {
  const {
    membershipQuery,
    setMembershipQuery,
  } = useManageMembershipQueryStore(
    useShallow(
      ({
        membershipQuery,
        setMembershipQuery,
      }) => ({
        membershipQuery,
        setMembershipQuery,
      })
    )
  );

  const columns = useMemo(
    () =>
      getColumnsManageMembership({
        onEdit: () => {},
        onDelete: () => {},
      }),
    []
  );

  const onPageChange = (page: number) => {
    setMembershipQuery({
      ...membershipQuery,
      page,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <MembershipTableHeader />
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

export default MembershipTable;