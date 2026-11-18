import {
  IGetListCouponQuery,
  IGetListRedemptionQuery,
} from "@/src/interfaces/admin/coupons/list";
import { create } from "zustand";

interface IManageCouponQuery {
  couponQuery: IGetListCouponQuery;
  setCouponQuery: (query: Partial<IGetListCouponQuery>) => void;
}

const DEFAULT_COUPON_QUERY: IGetListCouponQuery = { page: 1, limit: 10 };

export const useManageCouponQueryStore = create<IManageCouponQuery>()(
  (set, get) => ({
    couponQuery: DEFAULT_COUPON_QUERY,
    setCouponQuery: (query) =>
      set({ couponQuery: { ...get().couponQuery, ...query } }),
  }),
);

interface IManageRedemptionQuery {
  redemptionQuery: IGetListRedemptionQuery;
  setRedemptionQuery: (query: Partial<IGetListRedemptionQuery>) => void;
}

const DEFAULT_REDEMPTION_QUERY: IGetListRedemptionQuery = { page: 1, limit: 10 };

export const useManageRedemptionQueryStore = create<IManageRedemptionQuery>()(
  (set, get) => ({
    redemptionQuery: DEFAULT_REDEMPTION_QUERY,
    setRedemptionQuery: (query) =>
      set({ redemptionQuery: { ...get().redemptionQuery, ...query } }),
  }),
);
