"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiCreateMedicalRecord,
  apiDeleteMedicalRecord,
  apiUpdateMedicalRecord,
  ICreateMedicalRecordBody,
  IUpdateMedicalRecordBody,
} from "../../../api/admin/medical-records/list";
import {
  MEDICAL_RECORDS_KEY,
  UPCOMING_DUES_KEY,
} from "../../../query/admin/medical-records/list";
import { isApiError } from "@/src/utils/common/server-action";

// Creating/updating/deleting a record can change both the ledger list and the
// upcoming-dues schedule, so both query keys are invalidated together.
const useInvalidateMedicalRecords = () => {
  const queryClient = useQueryClient();

  return () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: [MEDICAL_RECORDS_KEY] }),
      queryClient.invalidateQueries({ queryKey: [UPCOMING_DUES_KEY] }),
    ]);
};

export const useCreateMedicalRecordMutation = () => {
  const invalidate = useInvalidateMedicalRecords();

  return useMutation({
    meta: { successMessage: "Medical record created." },
    mutationFn: async (body: ICreateMedicalRecordBody) => {
      const response = await apiCreateMedicalRecord(body);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data;
    },
    onSuccess: invalidate,
  });
};

export const useUpdateMedicalRecordMutation = () => {
  const invalidate = useInvalidateMedicalRecords();

  return useMutation({
    meta: { successMessage: "Medical record updated." },
    mutationFn: async ({
      id,
      body,
    }: {
      id: string;
      body: IUpdateMedicalRecordBody;
    }) => {
      const response = await apiUpdateMedicalRecord(id, body);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data;
    },
    onSuccess: invalidate,
  });
};

export const useDeleteMedicalRecordMutation = () => {
  const invalidate = useInvalidateMedicalRecords();

  return useMutation({
    meta: { successMessage: "Medical record deleted." },
    mutationFn: async (id: string) => {
      const response = await apiDeleteMedicalRecord(id);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data;
    },
    onSuccess: invalidate,
  });
};
