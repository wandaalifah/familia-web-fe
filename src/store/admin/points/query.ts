import { IGetListPointsQuery } from "@/src/interfaces/admin/points/list";
import { create } from "zustand";

interface IManagePointsQuery {
  pointsQuery: IGetListPointsQuery;
  setPointsQuery: (query: Partial<IGetListPointsQuery>) => void;
}

export const useManagePointsQueryStore = create<IManagePointsQuery>()(
  (set, get) => ({
    pointsQuery: { page: 1, limit: 10 },
    setPointsQuery: (query) =>
      set({ pointsQuery: { ...(get().pointsQuery as any), ...query } }),
  })
);
