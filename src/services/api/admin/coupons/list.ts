"use server";

import { IGlobalResponseDto } from "@/src/interfaces/global/pagination/response";
import {
  ICoupon,
  ICouponDetail,
  IGetListCouponQuery,
  IGetListRedemptionQuery,
  IRedeemCouponResponse,
  IRedemption,
} from "@/src/interfaces/admin/coupons/list";
import { api } from "../../../satellite";
import { handleAxiosError } from "@/src/utils/common/axios";

export const apiGetCouponList = async (query: IGetListCouponQuery) => {
  try {
    const response = await api.get<IGlobalResponseDto<ICoupon[]>>(
      "/admin/reward/list",
      { params: query },
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiGetCouponDetail = async (id: string) => {
  try {
    const response = await api.get<IGlobalResponseDto<ICouponDetail>>(
      `/admin/reward/detail/${id}`,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiGetRedemptionList = async (query: IGetListRedemptionQuery) => {
  try {
    const response = await api.get<IGlobalResponseDto<IRedemption[]>>(
      "/admin/reward/redemptions",
      { params: query },
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiRedeemCoupon = async (id: string, body: { userId: string }) => {
  try {
    const response = await api.post<IGlobalResponseDto<IRedeemCouponResponse>>(
      `/admin/reward/redeem/${id}`,
      body,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiCreateCoupon = async (body: {
  title: string;
  description?: string;
  points_cost: number;
}) => {
  try {
    const response = await api.post<IGlobalResponseDto<ICoupon>>(
      "/admin/reward/create",
      body,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiUpdateCoupon = async (
  id: string,
  body: Partial<{ title: string; description: string; points_cost: number }>,
) => {
  try {
    const response = await api.patch<IGlobalResponseDto<ICoupon>>(
      `/admin/reward/update/${id}`,
      body,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const apiDeleteCoupon = async (id: string) => {
  try {
    const response = await api.delete<IGlobalResponseDto<ICoupon>>(
      `/admin/reward/delete/${id}`,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};
