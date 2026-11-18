"use client";

import { DataTable } from "../../global/table";
import TiersTableHeader from "./table-header";
import { useMemo, useState } from "react";
import TierFormModal, { TierFormValues } from "./tier-form-modal";
import DeleteTierModal from "./delete-tier-modal";
import { getColumnsManageTiers } from "./column";
import { exportData, dateStamp, ExportFormat } from "@/src/utils/export-data";
import { useManageTierQueryStore } from "@/src/store/admin/tiers/query";
import { useTierListQuery } from "@/src/services/query/admin/tiers/list";
import {
  useCreateTierMutation,
  useDeleteTierMutation,
  useUpdateTierMutation,
} from "@/src/services/mutation/admin/tiers/list";

type ModalState =
  | { type: "closed" }
  | { type: "create" }
  | { type: "edit"; id: string }
  | { type: "delete"; id: string };

const CLOSED: ModalState = { type: "closed" };

const TiersTable = () => {
  const { tierQuery, setTierQuery } = useManageTierQueryStore();
  const { data, isLoading, isFetching } = useTierListQuery(tierQuery);
  const createTier = useCreateTierMutation();
  const updateTier = useUpdateTierMutation();
  const deleteTier = useDeleteTierMutation();

  const [modal, setModal] = useState<ModalState>(CLOSED);

  const rows = data?.items ?? [];
  const selected =
    modal.type === "edit" || modal.type === "delete"
      ? rows.find((row) => row.id === modal.id)
      : undefined;

  const handleSearchChange = (value: string) => {
    setTierQuery({ search: value || undefined, page: 1 });
  };

  const handleCreate = async (values: TierFormValues) => {
    try {
      await createTier.mutateAsync(values);
    } catch (error) {
      // Toasted globally; rethrow so the form stays open
      throw error;
    }
  };

  const handleUpdate = async (values: TierFormValues) => {
    if (!selected) return;
    try {
      await updateTier.mutateAsync({ id: selected.id, body: values });
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    try {
      await deleteTier.mutateAsync(selected.id);
    } catch (error) {
      throw error;
    }
  };

  const handleExport = (format: ExportFormat) => {
    exportData(
      rows,
      [
        { header: "ID", accessor: (row) => row.id },
        { header: "Level", accessor: (row) => row.level },
        { header: "Name", accessor: (row) => row.name },
        { header: "Description", accessor: (row) => row.description },
        { header: "Required Points", accessor: (row) => row.required_points },
        { header: "Active Members", accessor: (row) => row._count.memberships },
      ],
      `vet-clinic-tiers-${dateStamp()}`,
      format,
    );
  };

  const columns = useMemo(
    () =>
      getColumnsManageTiers({
        onEdit: (id) => setModal({ type: "edit", id }),
        onDelete: (id) => setModal({ type: "delete", id }),
      }),
    [],
  );

  return (
    <div className="flex flex-col gap-4">
      <TiersTableHeader
        onCreate={() => setModal({ type: "create" })}
        onSearchChange={handleSearchChange}
        onExport={handleExport}
      />
      <DataTable
        containerClassName="max-h-[calc(100vh-280px)] overflow-y-auto"
        columns={columns}
        data={rows}
        rowId="id"
        pagination={data?.pagination ?? undefined}
        onPageChange={(page) => setTierQuery({ page })}
        isLoading={isLoading || isFetching}
      />

      <TierFormModal
        open={modal.type === "create"}
        onSubmit={handleCreate}
        onOpenChange={(open) => !open && setModal(CLOSED)}
      />
      <TierFormModal
        key={selected?.id ?? "edit"}
        open={modal.type === "edit" && Boolean(selected)}
        initialValues={
          selected && {
            name: selected.name,
            description: selected.description,
            level: selected.level,
            required_points: selected.required_points,
          }
        }
        onSubmit={handleUpdate}
        onOpenChange={(open) => !open && setModal(CLOSED)}
      />
      <DeleteTierModal
        open={modal.type === "delete" && Boolean(selected)}
        tierName={selected?.name ?? ""}
        memberCount={selected?._count.memberships ?? 0}
        onConfirm={handleDelete}
        onOpenChange={(open) => !open && setModal(CLOSED)}
      />
    </div>
  );
};

export default TiersTable;
