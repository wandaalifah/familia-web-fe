
import { IGetListMembershipQuery } from "@/src/interfaces/admin/membership/list";
import { create } from "zustand";

interface IManageMembershipQuery {
  membershipQuery: IGetListMembershipQuery;
  setMembershipQuery: (query: Partial<IGetListMembershipQuery>) => void;
}

export const useManageMembershipQueryStore = create<IManageMembershipQuery>()(
  (set, get) => ({
    membershipQuery: { page: 1, limit: 10 },
    setMembershipQuery: (query) =>
      set({ membershipQuery: { ...(get().membershipQuery as any), ...query } }),
  })
);