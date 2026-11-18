"use server";

import { IGlobalResponseDto } from "@/src/interfaces/global/pagination/response";
import {
  IGetListMedicalRecordQuery,
  IGetUpcomingDuesQuery,
  IMedicalRecord,
  MedicalRecordType,
} from "@/src/interfaces/admin/medical-records/list";
import { api } from "../../../satellite";
import { handleAxiosError } from "@/src/utils/common/axios";

export const apiGetMedicalRecordList = async (
  query: IGetListMedicalRecordQuery,
) => {
  try {
    const response = await api.get<IGlobalResponseDto<IMedicalRecord[]>>(
      "/admin/medical-history/list",
      { params: query },
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiGetUpcomingDues = async (query: IGetUpcomingDuesQuery) => {
  try {
    const response = await api.get<IGlobalResponseDto<IMedicalRecord[]>>(
      "/admin/medical-history/upcoming-dues",
      { params: query },
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiGetMedicalRecordDetail = async (id: string) => {
  try {
    const response = await api.get<IGlobalResponseDto<IMedicalRecord>>(
      `/admin/medical-history/detail/${id}`,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export interface ICreateMedicalRecordBody {
  petId: string;
  type: MedicalRecordType;
  title: string;
  complaint?: string;
  clinical_signs?: string;
  diagnosis?: string;
  weight?: number;
  temperature?: number;
  appetite?: string;
  defecation?: string;
  urination?: string;
  vomiting?: string;
  treatment?: string;
  prescription?: string;
  notes?: string;
  vaccine_name?: string;
  dose_number?: number;
  /** ISO datetime ending in Z. */
  administered_at: string;
  /** ISO datetime ending in Z; only valid for RAWAT_INAP. */
  discharged_at?: string;
  /** ISO datetime ending in Z; manual follow-up date, RAWAT_JALAN only. */
  next_due_date?: string;
  doctor_name?: string;
  medical_staff_name?: string;
  /** Grants EARNED points to the pet owner in the same transaction; create-only. */
  award_points?: number;
}

export type IUpdateMedicalRecordBody = Partial<
  Omit<ICreateMedicalRecordBody, "award_points">
>;

export const apiCreateMedicalRecord = async (body: ICreateMedicalRecordBody) => {
  try {
    const response = await api.post<IGlobalResponseDto<IMedicalRecord>>(
      "/admin/medical-history/create",
      body,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiUpdateMedicalRecord = async (
  id: string,
  body: IUpdateMedicalRecordBody,
) => {
  try {
    const response = await api.patch<IGlobalResponseDto<IMedicalRecord>>(
      `/admin/medical-history/update/${id}`,
      body,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiDeleteMedicalRecord = async (id: string) => {
  try {
    const response = await api.delete<IGlobalResponseDto<IMedicalRecord>>(
      `/admin/medical-history/delete/${id}`,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};
