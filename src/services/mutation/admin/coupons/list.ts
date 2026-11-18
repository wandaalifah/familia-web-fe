"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiCreateCoupon,
  apiDeleteCoupon,
  apiRedeemCoupon,
  apiUpdateCoupon,
} from "../../../api/admin/coupons/list";
import { COUPON_LIST_KEY, REDEMPTION_LIST_KEY } from "../../../query/admin/coupons/list";
import { isApiError } from "@/src/utils/common/server-action";

const useInvalidateCoupons = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: [COUPON_LIST_KEY] });
};

export const useCreateCouponMutation = () => {
  const invalidate = useInvalidateCoupons();
  return useMutation({
    meta: { successMessage: "Coupon created." },
    mutationFn: async (body: {
      title: string;
      description?: string;
      points_cost: number;
    }) => {
      const response = await apiCreateCoupon(body);
      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }
      return response.data;
    },
    onSuccess: invalidate,
  });
};

export const useUpdateCouponMutation = () => {
  const invalidate = useInvalidateCoupons();
  return useMutation({
    meta: { successMessage: "Coupon updated." },
    mutationFn: async (vars: {
      id: string;
      body: Partial<{ title: string; description: string; points_cost: number }>;
    }) => {
      const response = await apiUpdateCoupon(vars.id, vars.body);
      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }
      return response.data;
    },
    onSuccess: invalidate,
  });
};

export const useDeleteCouponMutation = () => {
  const invalidate = useInvalidateCoupons();
  return useMutation({
    meta: { successMessage: "Coupon deleted." },
    mutationFn: async (id: string) => {
      const response = await apiDeleteCoupon(id);
      if (isApiError(response)) {
        // Surfaces the server's 409 "already redeemed" message to the caller
        // so the delete modal can show the blocked state from real data.
        throw new Error(response.error?.message);
      }
      return response.data;
    },
    onSuccess: invalidate,
  });
};

export const useRedeemCouponMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    meta: { successMessage: "Coupon redeemed for member." },
    mutationFn: async (vars: { id: string; userId: string }) => {
      const response = await apiRedeemCoupon(vars.id, { userId: vars.userId });
      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }
      return response.data;
    },
    onSuccess: () => {
      // Redeeming changes _count.redemptions on the coupon and adds a row to history.
      queryClient.invalidateQueries({ queryKey: [COUPON_LIST_KEY] });
      queryClient.invalidateQueries({ queryKey: [REDEMPTION_LIST_KEY] });
    },
  });
};
