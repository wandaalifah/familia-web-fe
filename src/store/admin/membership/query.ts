import { IGetListMembershipQuery } from "@/src/interfaces/admin/membership/list";
import { create } from "zustand";

interface IManageMembershipQuery {
  membershipQuery: IGetListMembershipQuery;
  setMembershipQuery: (query: Partial<IGetListMembershipQuery>) => void;
  resetMembershipQuery: () => void;
}

const DEFAULT_QUERY: IGetListMembershipQuery = {
  page: 1,
  limit: 10,
  sort_by: "created_at",
  sort_order: "desc",
};

export const useManageMembershipQueryStore = create<IManageMembershipQuery>()(
  (set, get) => ({
    membershipQuery: DEFAULT_QUERY,
    setMembershipQuery: (query) =>
      set({ membershipQuery: { ...get().membershipQuery, ...query } }),
    resetMembershipQuery: () => set({ membershipQuery: DEFAULT_QUERY }),
  }),
);
