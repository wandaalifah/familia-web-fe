"use client";

import { DataTable } from "../../global/table";
import MembershipTableHeader from "./table-header";
import { useManageMembershipQueryStore } from "@/src/store/admin/membership/query";
import { useManageMembershipModal } from "@/src/store/admin/membership/modal";
import { useGetMembershipListQuery } from "@/src/services/query/admin/membership";
import { useShallow } from "zustand/shallow";
import { useMemo } from "react";
import { getColumnsManageMembership } from "./column";
import { IMembership } from "@/src/interfaces/admin/membership/list";

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

  const { setOpenedMembership } = useManageMembershipModal();

  const { data, isLoading } = useGetMembershipListQuery(membershipQuery);

  const membershipData = data?.data || [];
  const pagination = data?.pagination;

  const columns = useMemo(
    () =>
      getColumnsManageMembership({
        onEdit: (id: string) => {
          const membership = membershipData.find((m) => m.id === id);
          if (membership) {
            setOpenedMembership(membership);
          }
        },
        onDelete: (id: string) => {
          console.log("Delete membership:", id);
        },
      }),
    [membershipData, setOpenedMembership]
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
        data={membershipData}
        isLoading={isLoading}
        pagination={pagination ? {
          current_page: pagination.current_page,
          total_page: pagination.total_page,
          total_data: pagination.total_data,
          limit: pagination.limit || 10,
          next: pagination.next,
          prev: pagination.prev,
        } : undefined}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default MembershipTable;