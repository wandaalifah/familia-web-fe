"use client";

import { DataTable } from "../../global/table";
import PointsTableHeader from "./table-header";
import PointsSummaryCards from "./summary-cards";
import { useMemo, useState } from "react";
import AdjustPointsModal, {
  AdjustPointsValues,
  MembershipOption,
} from "./adjust-points-modal";
import { getColumnsManagePoints } from "./column";
import {
  SortableField,
  SortOrder,
} from "@/src/components/atoms/table/sortable-header";
import { exportData, dateStamp, ExportFormat } from "@/src/utils/export-data";
import { useManagePointQueryStore } from "@/src/store/admin/points/query";
import {
  useMembershipOptionsQuery,
  usePointHistoryQuery,
} from "@/src/services/query/admin/points/list";
import { useAdjustPointsMutation } from "@/src/services/mutation/admin/points/list";

const DEFAULT_SORT_BY: SortableField = "created_at";
const DEFAULT_SORT_ORDER: SortOrder = "desc";

const PointsTable = () => {
  const { pointQuery, setPointQuery } = useManagePointQueryStore();
  const [adjustOpen, setAdjustOpen] = useState(false);
  const [memberSearch, setMemberSearch] = useState("");

  const { data, isLoading } = usePointHistoryQuery(pointQuery);
  const rows = data?.items ?? [];
  const pagination = data?.pagination ?? undefined;

  const { data: membershipData, isFetching: isSearchingMembers } =
    useMembershipOptionsQuery(memberSearch);
  const membershipOptions: MembershipOption[] = (membershipData ?? []).map(
    (opt) => ({
      value: opt.id,
      label: `${opt.users.first_name} ${opt.users.last_name}`,
      currentPoints: opt.points,
    }),
  );

  const adjustPointsMutation = useAdjustPointsMutation();

  const sortBy = (pointQuery.sort_by ?? DEFAULT_SORT_BY) as SortableField;
  const sortOrder = (pointQuery.sort_order ?? DEFAULT_SORT_ORDER) as SortOrder;

  const handleSort = (field: SortableField, order: SortOrder) => {
    if (order === null) {
      setPointQuery({ sort_by: DEFAULT_SORT_BY, sort_order: DEFAULT_SORT_ORDER, page: 1 });
      return;
    }
    setPointQuery({
      sort_by: field as "created_at" | "amount" | "type",
      sort_order: order,
      page: 1,
    });
  };

  const handleSearchByChange = (searchBy: string) => {
    setPointQuery({ search_by: searchBy as "description" | "type", page: 1 });
  };

  const handleSearchChange = (search: string) => {
    setPointQuery({ search, page: 1 });
  };

  const handleApplyFilter = (values: Record<string, string>) => {
    setPointQuery({
      type:
        values.type && values.type !== "ALL"
          ? (values.type as "EARNED" | "REDEEMED" | "ADJUSTMENT")
          : undefined,
      startDate: values.startDate || undefined,
      endDate: values.endDate || undefined,
      page: 1,
    });
  };

  const handleResetFilter = () => {
    setPointQuery({
      type: undefined,
      startDate: undefined,
      endDate: undefined,
      page: 1,
    });
  };

  const handleAdjust = async (values: AdjustPointsValues) => {
    try {
      await adjustPointsMutation.mutateAsync({
        membershipId: values.membershipId,
        amount: values.amount,
        type: values.type,
        description: values.description,
      });
      setMemberSearch("");
    } catch (error) {
      // Toasted globally; rethrow so the form keeps its values
      throw error;
    }
  };

  const handleExport = (format: ExportFormat) => {
    exportData(
      rows,
      [
        { header: "ID", accessor: (row) => row.id },
        { header: "Type", accessor: (row) => row.type },
        { header: "Description", accessor: (row) => row.description },
        { header: "Amount", accessor: (row) => row.amount },
        {
          header: "Member",
          accessor: (row) =>
            `${row.membership.users.first_name} ${row.membership.users.last_name}`,
        },
        {
          header: "Transaction Date",
          accessor: (row) => new Date(row.created_at).toISOString().split("T")[0],
        },
      ],
      `vet-clinic-points-${dateStamp()}`,
      format,
    );
  };

  const columns = useMemo(
    () => getColumnsManagePoints({ sortBy, sortOrder, onSort: handleSort }),
    [sortBy, sortOrder, handleSort],
  );

  return (
    <div className="flex flex-col gap-4">
      <PointsSummaryCards rows={rows} />
      <PointsTableHeader
        onAdjust={() => setAdjustOpen(true)}
        onSearchByChange={handleSearchByChange}
        onSearchChange={handleSearchChange}
        onExport={handleExport}
        filterValues={{
          type: pointQuery.type ?? "ALL",
          startDate: pointQuery.startDate ?? "",
          endDate: pointQuery.endDate ?? "",
        }}
        onApplyFilter={handleApplyFilter}
        onResetFilter={handleResetFilter}
      />
      <DataTable
        containerClassName="max-h-[calc(100vh-280px)] overflow-y-auto"
        columns={columns}
        data={rows}
        rowId="id"
        pagination={pagination}
        onPageChange={(page) => setPointQuery({ page })}
        isLoading={isLoading}
      />

      <AdjustPointsModal
        open={adjustOpen}
        membershipOptions={membershipOptions}
        memberSearch={memberSearch}
        onMemberSearchChange={setMemberSearch}
        isSearchingMembers={isSearchingMembers}
        onSubmit={handleAdjust}
        onOpenChange={setAdjustOpen}
      />
    </div>
  );
};

export default PointsTable;
