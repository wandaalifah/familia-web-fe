import { IGetListTiersQuery } from "@/src/interfaces/admin/tiers/list";
import { create } from "zustand";

interface IManageTiersQuery {
  tiersQuery: IGetListTiersQuery;
  setTiersQuery: (query: Partial<IGetListTiersQuery>) => void;
}

export const useManageTiersQueryStore = create<IManageTiersQuery>()(
  (set, get) => ({
    tiersQuery: { page: 1, limit: 10 },
    setTiersQuery: (query) =>
      set({ tiersQuery: { ...(get().tiersQuery as any), ...query } }),
  })
);
