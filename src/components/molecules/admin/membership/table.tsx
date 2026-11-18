"use client";

import { DataTable } from "../../global/table";
import MembershipTableHeader from "./table-header";
import { useManageMembershipQueryStore } from "@/src/store/admin/membership/query";
import { useShallow } from "zustand/shallow";
import { useMemo, useState } from "react";
import MemberFormModal, { MemberFormValues } from "./member-form-modal";
import TierChangeModal, { TierChangeValues } from "./tier-change-modal";
import { getColumnsManageMembership } from "./column";
import { exportData, dateStamp, ExportFormat } from "@/src/utils/export-data";
import {
  useMembershipListQuery,
  useTierOptionsQuery,
} from "@/src/services/query/admin/membership/list";
import {
  useCreateMembershipMutation,
  useUpdateMembershipTierMutation,
} from "@/src/services/mutation/admin/membership/list";

type ModalState =
  | { type: "closed" }
  | { type: "create" }
  | { type: "change-tier"; id: string };

const CLOSED: ModalState = { type: "closed" };

const MembershipTable = () => {
  const [modal, setModal] = useState<ModalState>(CLOSED);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const { membershipQuery, setMembershipQuery } = useManageMembershipQueryStore(
    useShallow(({ membershipQuery, setMembershipQuery }) => ({
      membershipQuery,
      setMembershipQuery,
    })),
  );

  const effectiveQuery = useMemo(
    () => ({
      ...membershipQuery,
      tier_id:
        filters.tier_id && filters.tier_id !== "ALL" ? filters.tier_id : undefined,
    }),
    [membershipQuery, filters],
  );

  const { data, isLoading, isFetching } = useMembershipListQuery(effectiveQuery);
  const { data: tierOptions } = useTierOptionsQuery();
  const createMutation = useCreateMembershipMutation();
  const tierMutation = useUpdateMembershipTierMutation();

  const rows = data?.items ?? [];
  const selected =
    modal.type === "change-tier"
      ? rows.find((row) => row.id === modal.id)
      : undefined;

  const handleCreate = async (values: MemberFormValues) => {
    try {
      await createMutation.mutateAsync({
        email: values.email,
        phone: values.phone,
        first_name: values.first_name,
        last_name: values.last_name || undefined,
        password: values.password || undefined,
      });
    } catch {
      // Error toast is shown by the global MutationCache handler (app/providers.tsx)
    }
  };

  const handleChangeTier = async (values: TierChangeValues) => {
    if (!selected) return;
    try {
      await tierMutation.mutateAsync({ id: selected.id, tierId: values.tierId });
    } catch {
      // Error toast is shown by the global MutationCache handler (app/providers.tsx)
    }
  };

  // Exports only the currently-loaded page — there is no "export all filtered
  // rows" endpoint in the API contract yet.
  const handleExport = (format: ExportFormat) => {
    exportData(
      rows,
      [
        { header: "ID", accessor: (row) => row.id },
        { header: "First Name", accessor: (row) => row.users.first_name },
        { header: "Last Name", accessor: (row) => row.users.last_name },
        { header: "Email", accessor: (row) => row.users.email },
        { header: "Phone", accessor: (row) => row.users.phone },
        { header: "Tier", accessor: (row) => row.tiers?.name ?? "" },
        { header: "Current Points", accessor: (row) => row.points },
        { header: "Seasonal Points", accessor: (row) => row.seasonal_points },
      ],
      `vet-clinic-membership-${dateStamp()}`,
      format,
    );
  };

  const columns = useMemo(
    () =>
      getColumnsManageMembership({
        onChangeTier: (id) => setModal({ type: "change-tier", id }),
      }),
    [],
  );

  const onPageChange = (page: number) => {
    setMembershipQuery({ page });
  };

  return (
    <div className="flex flex-col gap-4">
      <MembershipTableHeader
        onCreate={() => setModal({ type: "create" })}
        onExport={handleExport}
        filterValues={filters}
        onApplyFilter={(values) => {
          setFilters(values);
          setMembershipQuery({ page: 1 });
        }}
        onResetFilter={() => {
          setFilters({});
          setMembershipQuery({ page: 1 });
        }}
      />
      <DataTable
        containerClassName="max-h-[calc(100vh-280px)] overflow-y-auto"
        columns={columns}
        data={rows}
        pagination={data?.pagination ?? undefined}
        onPageChange={onPageChange}
        isLoading={isLoading || isFetching}
      />

      <MemberFormModal
        open={modal.type === "create"}
        onSubmit={handleCreate}
        onOpenChange={(open) => !open && setModal(CLOSED)}
      />
      <TierChangeModal
        key={selected?.id ?? "change-tier"}
        open={modal.type === "change-tier" && Boolean(selected)}
        memberName={
          selected
            ? `${selected.users.first_name} ${selected.users.last_name}`
            : ""
        }
        currentTierId={selected?.tierId ?? null}
        tierOptions={tierOptions ?? []}
        onSubmit={handleChangeTier}
        onOpenChange={(open) => !open && setModal(CLOSED)}
      />
    </div>
  );
};

export default MembershipTable;
