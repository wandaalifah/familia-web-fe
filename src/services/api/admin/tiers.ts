"use server";

import { IGlobalResponseDto } from "@/src/interfaces/global/pagination/response";
import { ITierItem, IGetListTiersQuery } from "@/src/interfaces/admin/tiers/list";
import { ICreateTier } from "@/src/interfaces/admin/tiers/create";
import { api } from "../../satellite";
import { handleAxiosError } from "@/src/utils/common/axios";

export const apiGetTiersList = async (
  query: IGetListTiersQuery,
) => {
  try {
    const response = await api.get<
      IGlobalResponseDto<ITierItem[]>
    >("/admin/tiers/list", { params: query });

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiCreateTier = async (
  body: ICreateTier,
) => {
  try {
    const response = await api.post<
      IGlobalResponseDto<ITierItem>
    >("/admin/tiers/create", body);

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};
