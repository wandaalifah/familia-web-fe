"use server";

import { IGlobalResponseDto } from "@/src/interfaces/global/pagination/response";
import { ICouponItem, IGetListCouponsQuery } from "@/src/interfaces/admin/rewards/list";
import { api } from "../../satellite";
import { handleAxiosError } from "@/src/utils/common/axios";

export const apiGetCouponsList = async (
  query: IGetListCouponsQuery,
) => {
  try {
    const response = await api.get<
      IGlobalResponseDto<ICouponItem[]>
    >("/admin/reward/list", { params: query });

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};
