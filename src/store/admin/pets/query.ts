import { IGetListPetQuery } from "@/src/interfaces/admin/pets/list";
import { create } from "zustand";

interface IManagePetQuery {
  petQuery: IGetListPetQuery;
  setPetQuery: (query: Partial<IGetListPetQuery>) => void;
  resetPetQuery: () => void;
}

const DEFAULT_QUERY: IGetListPetQuery = {
  page: 1,
  limit: 10,
  search_by: "name",
};

export const useManagePetQueryStore = create<IManagePetQuery>()((set, get) => ({
  petQuery: DEFAULT_QUERY,
  setPetQuery: (query) => set({ petQuery: { ...get().petQuery, ...query } }),
  resetPetQuery: () => set({ petQuery: DEFAULT_QUERY }),
}));
