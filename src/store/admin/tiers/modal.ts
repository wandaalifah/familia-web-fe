import { ITierItem } from "@/src/interfaces/admin/tiers/list";
import { create } from "zustand";

interface IManageTiersModal {
  openedTiers: ITierItem | null;
  setOpenedTiers: (data: ITierItem | null) => void;
}

export const useManageTiersModal = create<IManageTiersModal>()((set) => ({
  openedTiers: null,
  setOpenedTiers: (data: ITierItem | null) => set({ openedTiers: data }),
}));