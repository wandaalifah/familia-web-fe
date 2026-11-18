import { IGetListPointQuery } from "@/src/interfaces/admin/points/list";
import { create } from "zustand";

interface IManagePointQuery {
  pointQuery: IGetListPointQuery;
  setPointQuery: (query: Partial<IGetListPointQuery>) => void;
  resetPointQuery: () => void;
}

const DEFAULT_QUERY: IGetListPointQuery = {
  page: 1,
  limit: 10,
  sort_by: "created_at",
  sort_order: "desc",
  search_by: "description",
};

export const useManagePointQueryStore = create<IManagePointQuery>()(
  (set, get) => ({
    pointQuery: DEFAULT_QUERY,
    setPointQuery: (query) =>
      set({ pointQuery: { ...get().pointQuery, ...query } }),
    resetPointQuery: () => set({ pointQuery: DEFAULT_QUERY }),
  }),
);
