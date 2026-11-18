"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  apiGetCouponDetail,
  apiGetCouponList,
  apiGetRedemptionList,
} from "../../../api/admin/coupons/list";
import {
  IGetListCouponQuery,
  IGetListRedemptionQuery,
} from "@/src/interfaces/admin/coupons/list";
import { isApiError } from "@/src/utils/common/server-action";

export const COUPON_LIST_KEY = "admin-coupon-list";
export const REDEMPTION_LIST_KEY = "admin-redemption-list";

export const useCouponListQuery = (query: IGetListCouponQuery) => {
  return useQuery({
    queryKey: [COUPON_LIST_KEY, query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await apiGetCouponList(query);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return { items: response.data, pagination: response.pagination ?? null };
    },
  });
};

export const useCouponDetailQuery = (id?: string) => {
  return useQuery({
    queryKey: [COUPON_LIST_KEY, "detail", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const response = await apiGetCouponDetail(id!);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data;
    },
  });
};

export const useRedemptionListQuery = (query: IGetListRedemptionQuery) => {
  return useQuery({
    queryKey: [REDEMPTION_LIST_KEY, query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await apiGetRedemptionList(query);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return { items: response.data, pagination: response.pagination ?? null };
    },
  });
};
