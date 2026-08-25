"use client";

import { DataTable } from "../../global/table";
import PointsTableHeader from "./table-header";
import { useManagePointsQueryStore } from "@/src/store/admin/points/query";
import { useShallow } from "zustand/shallow";
import { useMemo } from "react";
import { getColumnsManagePoints } from "./column";
import { IPointsHistoryItem } from "@/src/interfaces/admin/points/list";

const dummyData: IPointsHistoryItem[] = [
  {
    id: "pts-001",
    amount: 500,
    type: "EARN",
    description: "Purchase reward",
    reference_id: "order-001",
    created_at: new Date("2025-06-15"),
    membershipId: "mbr-001",
    membership: {
      id: "mbr-001",
      userId: "usr-001",
      users: {
        id: "usr-001",
        email: "budi.santoso@email.com",
        phone: "+6281234567890",
        first_name: "Budi",
        last_name: "Santoso",
      },
    },
  },
  {
    id: "pts-002",
    amount: -200,
    type: "REDEEM",
    description: "Reward redemption",
    reference_id: null,
    created_at: new Date("2025-07-20"),
    membershipId: "mbr-001",
    membership: {
      id: "mbr-001",
      userId: "usr-001",
      users: {
        id: "usr-001",
        email: "budi.santoso@email.com",
        phone: "+6281234567890",
        first_name: "Budi",
        last_name: "Santoso",
      },
    },
  },
  {
    id: "pts-003",
    amount: 100,
    type: "ADJUST",
    description: "Manual adjustment by admin",
    reference_id: null,
    created_at: new Date("2025-08-10"),
    membershipId: "mbr-002",
    membership: {
      id: "mbr-002",
      userId: "usr-002",
      users: {
        id: "usr-002",
        email: "siti.rahayu@email.com",
        phone: "+6287654321098",
        first_name: "Siti",
        last_name: "Rahayu",
      },
    },
  },
];

const PointsTable = () => {
  const { pointsQuery, setPointsQuery } = useManagePointsQueryStore(
    useShallow(({ pointsQuery, setPointsQuery }) => ({
      pointsQuery,
      setPointsQuery,
    }))
  );

  const columns = useMemo(() => getColumnsManagePoints(), []);

  const onPageChange = (page: number) => {
    setPointsQuery({
      ...pointsQuery,
      page,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <PointsTableHeader />
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

export default PointsTable;
