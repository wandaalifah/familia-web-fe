"use server";

import { IGlobalResponseDto } from "@/src/interfaces/global/pagination/response";
import {
  ICreateTierRequest,
  IDeleteTierResponse,
  IGetListTierQuery,
  ITier,
  ITierDetail,
  IUpdateTierRequest,
  IUpdateTierResponse,
} from "@/src/interfaces/admin/tiers/list";
import { api } from "../../../satellite";
import { handleAxiosError } from "@/src/utils/common/axios";

export const apiGetTierList = async (query: IGetListTierQuery) => {
  try {
    const response = await api.get<IGlobalResponseDto<ITier[]>>(
      "/admin/tiers/list",
      { params: query },
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiGetTierDetail = async (id: string) => {
  try {
    const response = await api.get<IGlobalResponseDto<ITierDetail>>(
      `/admin/tiers/detail/${id}`,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiCreateTier = async (body: ICreateTierRequest) => {
  try {
    const response = await api.post<IGlobalResponseDto<ITier>>(
      "/admin/tiers/create",
      body,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiUpdateTier = async (id: string, body: IUpdateTierRequest) => {
  try {
    const response = await api.patch<IGlobalResponseDto<IUpdateTierResponse>>(
      `/admin/tiers/update/${id}`,
      body,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiDeleteTier = async (id: string) => {
  try {
    const response = await api.delete<IGlobalResponseDto<IDeleteTierResponse>>(
      `/admin/tiers/delete/${id}`,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};
