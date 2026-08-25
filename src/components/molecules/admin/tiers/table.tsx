"use client";

import { DataTable } from "../../global/table";
import TiersTableHeader from "./table-header";
import { useManageTiersQueryStore } from "@/src/store/admin/tiers/query";
import { useManageTiersModal } from "@/src/store/admin/tiers/modal";
import { useGetTiersListQuery } from "@/src/services/query/admin/tiers";
import { useShallow } from "zustand/shallow";
import { useMemo } from "react";
import { getColumnsManageTiers } from "./column";

const TiersTable = () => {
  const { tiersQuery, setTiersQuery } = useManageTiersQueryStore(
    useShallow(({ tiersQuery, setTiersQuery }) => ({
      tiersQuery,
      setTiersQuery,
    }))
  );

  const { setOpenedTiers } = useManageTiersModal();

  const { data, isLoading } = useGetTiersListQuery(tiersQuery);

  const tiersData = data?.data || [];
  const pagination = data?.pagination;

  const columns = useMemo(
    () =>
      getColumnsManageTiers({
        onEdit: (id: string) => {
          const tier = tiersData.find((t) => t.id === id);
          if (tier) {
            setOpenedTiers(tier);
          }
        },
        onDelete: (id: string) => {
          console.log("Delete tier:", id);
        },
      }),
    [tiersData, setOpenedTiers]
  );

  const onPageChange = (page: number) => {
    setTiersQuery({
      ...tiersQuery,
      page,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <TiersTableHeader />
      <DataTable
        containerClassName="max-h-[calc(100vh-280px)] overflow-y-auto"
        columns={columns}
        data={tiersData}
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

export default TiersTable;
