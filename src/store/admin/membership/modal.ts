import { IMembership } from "@/src/interfaces/admin/membership/list";
import { create } from "zustand";

interface IManageMembershipModal {
  openedMembership: IMembership | null;
  setOpenedMembership: (data: IMembership | null) => void;
}

export const useManageMembershipModal = create<IManageMembershipModal>()((set) => ({
  openedMembership: null,
  setOpenedMembership: (data: IMembership | null) => set({ openedMembership: data }),
}));