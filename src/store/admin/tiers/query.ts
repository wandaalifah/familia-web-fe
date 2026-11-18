import { IGetListTierQuery } from "@/src/interfaces/admin/tiers/list";
import { create } from "zustand";

interface IManageTierQuery {
  tierQuery: IGetListTierQuery;
  setTierQuery: (query: Partial<IGetListTierQuery>) => void;
}

const DEFAULT_QUERY: IGetListTierQuery = {
  page: 1,
  limit: 10,
  sort_by: "level",
  sort_order: "asc",
  search_by: "name",
};

export const useManageTierQueryStore = create<IManageTierQuery>()(
  (set, get) => ({
    tierQuery: DEFAULT_QUERY,
    setTierQuery: (query) =>
      set({ tierQuery: { ...get().tierQuery, ...query } }),
  }),
);
