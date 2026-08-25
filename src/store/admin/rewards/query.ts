import { IGetListCouponsQuery } from "@/src/interfaces/admin/rewards/list";
import { create } from "zustand";

interface IManageCouponsQuery {
  couponsQuery: IGetListCouponsQuery;
  setCouponsQuery: (query: Partial<IGetListCouponsQuery>) => void;
}

export const useManageCouponsQueryStore = create<IManageCouponsQuery>()(
  (set, get) => ({
    couponsQuery: { page: 1, limit: 10 },
    setCouponsQuery: (query) =>
      set({ couponsQuery: { ...(get().couponsQuery as any), ...query } }),
  })
);
