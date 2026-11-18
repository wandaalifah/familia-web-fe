import { IGetListMedicalRecordQuery } from "@/src/interfaces/admin/medical-records/list";
import { create } from "zustand";

interface IManageMedicalRecordQuery {
  medicalQuery: IGetListMedicalRecordQuery;
  setMedicalQuery: (query: Partial<IGetListMedicalRecordQuery>) => void;
  resetMedicalQuery: () => void;
}

const DEFAULT_QUERY: IGetListMedicalRecordQuery = {
  page: 1,
  limit: 10,
  sort_by: "created_at",
  sort_order: "desc",
  search_by: "title",
};

export const useManageMedicalRecordQueryStore =
  create<IManageMedicalRecordQuery>()((set, get) => ({
    medicalQuery: DEFAULT_QUERY,
    setMedicalQuery: (query) =>
      set({ medicalQuery: { ...get().medicalQuery, ...query } }),
    resetMedicalQuery: () => set({ medicalQuery: DEFAULT_QUERY }),
  }));
