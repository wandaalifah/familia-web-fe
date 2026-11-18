"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  apiGetMedicalRecordDetail,
  apiGetMedicalRecordList,
  apiGetUpcomingDues,
} from "../../../api/admin/medical-records/list";
import {
  IGetListMedicalRecordQuery,
  IGetUpcomingDuesQuery,
} from "@/src/interfaces/admin/medical-records/list";
import { isApiError } from "@/src/utils/common/server-action";

export const MEDICAL_RECORDS_KEY = "admin-medical-records";
export const UPCOMING_DUES_KEY = "admin-medical-records-upcoming-dues";

export const useMedicalRecordListQuery = (query: IGetListMedicalRecordQuery) => {
  return useQuery({
    queryKey: [MEDICAL_RECORDS_KEY, query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await apiGetMedicalRecordList(query);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return { items: response.data ?? [], pagination: response.pagination ?? null };
    },
  });
};

// Records whose next_due_date falls within `days` (server-sorted, nearest first).
export const useUpcomingDuesQuery = (query: IGetUpcomingDuesQuery) => {
  return useQuery({
    queryKey: [UPCOMING_DUES_KEY, query],
    queryFn: async () => {
      const response = await apiGetUpcomingDues(query);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data ?? [];
    },
  });
};

export const useMedicalRecordDetailQuery = (id?: string) => {
  return useQuery({
    queryKey: [MEDICAL_RECORDS_KEY, "detail", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const response = await apiGetMedicalRecordDetail(id as string);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data;
    },
  });
};
