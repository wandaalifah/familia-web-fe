"use server";

import { IGlobalResponseDto } from "@/src/interfaces/global/pagination/response";
import {
  ICreateMembershipRequest,
  IGetListMembershipQuery,
  IMembership,
  IMembershipDetail,
  ITierOption,
} from "@/src/interfaces/admin/membership/list";
import { api } from "../../../satellite";
import { handleAxiosError } from "@/src/utils/common/axios";

export const apiGetMembershipList = async (query: IGetListMembershipQuery) => {
  try {
    const response = await api.get<IGlobalResponseDto<IMembership[]>>(
      "/admin/membership/list",
      { params: query },
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiGetMembershipDetail = async (id: string) => {
  try {
    const response = await api.get<IGlobalResponseDto<IMembershipDetail>>(
      `/admin/membership/detail/${id}`,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiCreateMembership = async (body: ICreateMembershipRequest) => {
  try {
    const response = await api.post<IGlobalResponseDto<IMembership>>(
      "/admin/membership/create",
      body,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiUpdateMembershipTier = async (id: string, tierId: string) => {
  try {
    const response = await api.patch<IGlobalResponseDto<IMembership>>(
      `/admin/membership/tier/${id}`,
      { tierId },
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

// Used to populate the tier filter and the "change tier" dropdown — fetches
// the full tier catalog (not paginated for admin dropdown purposes).
export const apiGetTierOptions = async () => {
  try {
    const response = await api.get<IGlobalResponseDto<ITierOption[]>>(
      "/admin/tiers/list",
      { params: { page: 1, limit: 100, sort_by: "level", sort_order: "asc" } },
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};
