"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DataTable } from "../../global/table";
import MedicalRecordTableHeader from "./table-header";
import UpcomingDuesBanner from "./upcoming-dues-banner";
import { useManageMedicalRecordQueryStore } from "@/src/store/admin/medical-records/query";
import { getColumnsManageMedicalRecords } from "./column";
import MedicalRecordFormModal, {
  MedicalRecordFormValues,
} from "./medical-record-form-modal";
import DeleteMedicalRecordModal from "./delete-medical-record-modal";
import { useMedicalRecordListQuery } from "@/src/services/query/admin/medical-records/list";
import {
  useCreateMedicalRecordMutation,
  useDeleteMedicalRecordMutation,
  useUpdateMedicalRecordMutation,
} from "@/src/services/mutation/admin/medical-records/list";
import { ICreateMedicalRecordBody } from "@/src/services/api/admin/medical-records/list";
import { exportData, dateStamp, ExportFormat } from "@/src/utils/export-data";
import { localInputToIso, toDateTimeLocalInput } from "@/src/utils/medical/datetime";

type ModalState =
  | { type: "closed" }
  | { type: "create" }
  | { type: "edit"; id: string }
  | { type: "delete"; id: string };

const CLOSED: ModalState = { type: "closed" };

// <input type="date"> gives "YYYY-MM-DD"; the API expects an ISO datetime ending in Z.
const toIsoDateTime = (value: string) => `${value}T00:00:00Z`;

const toDateInput = (value: Date | string | null): string =>
  value ? new Date(value).toISOString().split("T")[0] : "";


const MedicalRecordTable = () => {
  const searchParams = useSearchParams();
  const petIdFilter = searchParams.get("petId");
  const { medicalQuery, setMedicalQuery } = useManageMedicalRecordQueryStore();
  const [modal, setModal] = useState<ModalState>(CLOSED);

  const query = useMemo(
    () => ({ ...medicalQuery, petId: petIdFilter ?? medicalQuery.petId }),
    [medicalQuery, petIdFilter],
  );

  const { data, isLoading } = useMedicalRecordListQuery(query);
  const rows = data?.items ?? [];
  const pagination = data?.pagination ?? undefined;

  const createMutation = useCreateMedicalRecordMutation();
  const updateMutation = useUpdateMedicalRecordMutation();
  const deleteMutation = useDeleteMedicalRecordMutation();

  const selected =
    modal.type === "edit" || modal.type === "delete"
      ? rows.find((row) => row.id === modal.id)
      : undefined;

  const buildBody = (values: MedicalRecordFormValues): ICreateMedicalRecordBody => ({
    petId: values.petId,
    type: values.type,
    title: values.title,
    complaint: values.complaint || undefined,
    clinical_signs: values.clinical_signs || undefined,
    diagnosis: values.diagnosis || undefined,
    weight: values.weight,
    temperature: values.temperature,
    appetite: values.appetite || undefined,
    defecation: values.defecation || undefined,
    urination: values.urination || undefined,
    vomiting: values.vomiting || undefined,
    treatment: values.treatment || undefined,
    prescription: values.prescription || undefined,
    vaccine_name: values.type === "VACCINE" ? values.vaccine_name || undefined : undefined,
    dose_number: values.type === "VACCINE" ? values.dose_number || undefined : undefined,
    administered_at: localInputToIso(values.administered_at),
    discharged_at:
      values.type === "RAWAT_INAP" && values.discharged_at
        ? toIsoDateTime(values.discharged_at)
        : undefined,
    // Only a manual follow-up date (RAWAT_JALAN); other types are derived/blocked server-side
    next_due_date:
      values.type === "RAWAT_JALAN" && values.next_due_date
        ? toIsoDateTime(values.next_due_date)
        : undefined,
    notes: values.notes || undefined,
    doctor_name: values.doctor_name || undefined,
    medical_staff_name: values.medical_staff_name || undefined,
    award_points: values.award_points || undefined,
  });

  const handleCreate = async (values: MedicalRecordFormValues) => {
    // Success/error toasts come from the global MutationCache handler; a rejection
    // propagates so the form modal stays open.
    await createMutation.mutateAsync(buildBody(values));
  };

  const handleUpdate = async (values: MedicalRecordFormValues) => {
    if (!selected) return;
    const body = buildBody(values);
    delete body.award_points;
    await updateMutation.mutateAsync({ id: selected.id, body });
  };

  const handleDelete = async () => {
    if (!selected) return;
    await deleteMutation.mutateAsync(selected.id);
  };

  // Exports only the currently loaded page — there's no "export all filtered"
  // call yet, matching the pattern used by the other admin list modules.
  const handleExport = (format: ExportFormat) => {
    exportData(
      rows,
      [
        { header: "ID", accessor: (row) => row.id },
        { header: "Date", accessor: (row) => new Date(row.administered_at).toISOString().split("T")[0] },
        { header: "Pet", accessor: (row) => row.pet.name },
        { header: "Owner", accessor: (row) => `${row.pet.users.first_name} ${row.pet.users.last_name}` },
        { header: "Type", accessor: (row) => row.type },
        { header: "Title", accessor: (row) => row.title },
        { header: "Complaint", accessor: (row) => row.complaint ?? "" },
        { header: "Diagnosis", accessor: (row) => row.diagnosis ?? "" },
        { header: "Weight (kg)", accessor: (row) => row.weight ?? "" },
        { header: "Temperature (°C)", accessor: (row) => row.temperature ?? "" },
        { header: "Treatment", accessor: (row) => row.treatment ?? "" },
        { header: "Prescription & Advice", accessor: (row) => row.prescription ?? "" },
        { header: "Doctor (DPJP)", accessor: (row) => row.doctor_name ?? "" },
        { header: "Medical Staff", accessor: (row) => row.medical_staff_name ?? "" },
      ],
      `vet-clinic-medical-records-${dateStamp()}`,
      format,
    );
  };

  const columns = useMemo(
    () =>
      getColumnsManageMedicalRecords({
        onEdit: (id) => setModal({ type: "edit", id }),
        onDelete: (id) => setModal({ type: "delete", id }),
      }),
    [],
  );

  return (
    <div className="flex flex-col gap-4">
      <UpcomingDuesBanner />
      <MedicalRecordTableHeader
        onCreate={() => setModal({ type: "create" })}
        onExport={handleExport}
      />
      <DataTable
        containerClassName="max-h-[calc(100vh-280px)] overflow-y-auto"
        columns={columns}
        data={rows}
        pagination={pagination}
        onPageChange={(page) => setMedicalQuery({ page })}
        isLoading={isLoading}
        rowId="id"
      />

      <MedicalRecordFormModal
        open={modal.type === "create"}
        onSubmit={handleCreate}
        onOpenChange={(open) => !open && setModal(CLOSED)}
      />
      <MedicalRecordFormModal
        key={selected?.id ?? "edit"}
        open={modal.type === "edit" && Boolean(selected)}
        selectedPet={
          selected && { label: selected.pet.name, species: selected.pet.species }
        }
        initialValues={
          selected && {
            petId: selected.petId,
            type: selected.type,
            title: selected.title,
            vaccine_name: selected.vaccine_name ?? "",
            dose_number: selected.dose_number ?? undefined,
            administered_at: toDateTimeLocalInput(selected.administered_at),
            next_due_date: toDateInput(selected.next_due_date),
            discharged_at: toDateInput(selected.discharged_at),
            doctor_name: selected.doctor_name ?? "",
            medical_staff_name: selected.medical_staff_name ?? "",
            complaint: selected.complaint ?? "",
            clinical_signs: selected.clinical_signs ?? "",
            diagnosis: selected.diagnosis ?? "",
            weight: selected.weight ?? undefined,
            temperature: selected.temperature ?? undefined,
            appetite: selected.appetite ?? "",
            defecation: selected.defecation ?? "",
            urination: selected.urination ?? "",
            vomiting: selected.vomiting ?? "",
            treatment: selected.treatment ?? "",
            prescription: selected.prescription ?? "",
            notes: selected.notes ?? "",
            award_points: 0,
          }
        }
        onSubmit={handleUpdate}
        onOpenChange={(open) => !open && setModal(CLOSED)}
      />
      <DeleteMedicalRecordModal
        open={modal.type === "delete" && Boolean(selected)}
        recordTitle={selected?.title ?? ""}
        petName={selected?.pet.name ?? ""}
        onConfirm={handleDelete}
        onOpenChange={(open) => !open && setModal(CLOSED)}
      />
    </div>
  );
};

export default MedicalRecordTable;
