"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "../../global/table";
import PetTableHeader from "./table-header";
import { useManagePetQueryStore } from "@/src/store/admin/pets/query";
import { getColumnsManagePets } from "./column";
import PetFormModal, { PetFormValues } from "./pet-form-modal";
import ArchivePetModal from "./archive-pet-modal";
import { exportData, dateStamp, ExportFormat } from "@/src/utils/export-data";
import {
  usePetListQuery,
  usePetOwnerOptionsQuery,
} from "@/src/services/query/admin/pets/list";
import {
  useArchivePetMutation,
  useCreatePetMutation,
  useUpdatePetMutation,
} from "@/src/services/mutation/admin/pets/list";

type ModalState =
  | { type: "closed" }
  | { type: "create" }
  | { type: "edit"; id: string }
  | { type: "archive"; id: string };

const CLOSED: ModalState = { type: "closed" };

const PetTable = () => {
  const router = useRouter();
  const { petQuery, setPetQuery } = useManagePetQueryStore();
  const [modal, setModal] = useState<ModalState>(CLOSED);

  const { data, isLoading } = usePetListQuery(petQuery);
  const rows = data?.items ?? [];
  const pagination = data?.pagination ?? undefined;

  const { data: ownersOption = [] } = usePetOwnerOptionsQuery();

  const createMutation = useCreatePetMutation();
  const updateMutation = useUpdatePetMutation();
  const archiveMutation = useArchivePetMutation();

  const selected =
    modal.type === "edit" || modal.type === "archive"
      ? rows.find((row) => row.id === modal.id)
      : undefined;

  const handleCreate = async (values: PetFormValues) => {
    try {
      await createMutation.mutateAsync({
        userId: values.userId,
        name: values.name,
        species: values.species || undefined,
        breed: values.breed || undefined,
        birth_date: values.birth_date || undefined,
        is_neutered: values.is_neutered,
        avatar: values.avatar || undefined,
      });
    } catch {
      // Error toast is shown by the global MutationCache handler (app/providers.tsx)
    }
  };

  const handleUpdate = async (values: PetFormValues) => {
    if (!selected) return;
    try {
      await updateMutation.mutateAsync({
        id: selected.id,
        body: {
          name: values.name,
          species: values.species || undefined,
          breed: values.breed || undefined,
          birth_date: values.birth_date || undefined,
          is_neutered: values.is_neutered,
          avatar: values.avatar || undefined,
        },
      });
    } catch {
      // Error toast is shown by the global MutationCache handler (app/providers.tsx)
    }
  };

  const handleArchive = async () => {
    if (!selected) return;
    try {
      await archiveMutation.mutateAsync(selected.id);
    } catch {
      // Error toast is shown by the global MutationCache handler (app/providers.tsx)
    }
  };

  const handleExport = (format: ExportFormat) => {
    exportData(
      rows,
      [
        { header: "ID", accessor: (row) => row.id },
        { header: "Name", accessor: (row) => row.name },
        { header: "Species", accessor: (row) => row.species ?? "" },
        { header: "Breed", accessor: (row) => row.breed ?? "" },
        { header: "Neutered", accessor: (row) => (row.is_neutered ? "Yes" : "No") },
        {
          header: "Owner",
          accessor: (row) => `${row.users.first_name} ${row.users.last_name}`,
        },
        { header: "Owner Phone", accessor: (row) => row.users.phone },
        { header: "Medical Records", accessor: (row) => row._count.medical_history },
      ],
      `vet-clinic-pets-${dateStamp()}`,
      format,
    );
  };

  const columns = useMemo(
    () =>
      getColumnsManagePets({
        onEdit: (id) => setModal({ type: "edit", id }),
        onArchive: (id) => setModal({ type: "archive", id }),
        onViewMedical: (petId) =>
          router.push(`/admin/medical-records?petId=${petId}`),
      }),
    [router],
  );

  return (
    <div className="flex flex-col gap-4">
      <PetTableHeader onCreate={() => setModal({ type: "create" })} onExport={handleExport} />
      <DataTable
        containerClassName="max-h-[calc(100vh-280px)] overflow-y-auto"
        columns={columns}
        data={rows}
        rowId="id"
        isLoading={isLoading}
        pagination={pagination ?? undefined}
        onPageChange={(page) => setPetQuery({ page })}
      />

      <PetFormModal
        open={modal.type === "create"}
        ownersOption={ownersOption}
        onSubmit={handleCreate}
        onOpenChange={(open) => !open && setModal(CLOSED)}
      />
      <PetFormModal
        key={selected?.id ?? "edit"}
        open={modal.type === "edit" && Boolean(selected)}
        ownersOption={ownersOption}
        initialValues={
          selected && {
            userId: selected.userId,
            name: selected.name,
            species: selected.species ?? "",
            breed: selected.breed ?? "",
            birth_date:
              typeof selected.birth_date === "string"
                ? selected.birth_date
                : selected.birth_date?.toISOString().split("T")[0] ?? "",
            is_neutered: selected.is_neutered,
            avatar: selected.avatar ?? "",
          }
        }
        onSubmit={handleUpdate}
        onOpenChange={(open) => !open && setModal(CLOSED)}
      />
      <ArchivePetModal
        open={modal.type === "archive" && Boolean(selected)}
        petName={selected?.name ?? ""}
        onConfirm={handleArchive}
        onOpenChange={(open) => !open && setModal(CLOSED)}
      />
    </div>
  );
};

export default PetTable;
