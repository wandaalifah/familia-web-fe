"use server";

import { IGlobalResponseDto } from "@/src/interfaces/global/pagination/response";
import { api } from "../../../satellite";
import { handleAxiosError } from "@/src/utils/common/axios";

interface MembershipOptionItem {
  id: string;
  points: number;
  userId: string;
  users: {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
  };
}

// Lightweight member lookup for the "Redeem for Customer" picker.
// Hits the Membership module's own endpoint directly rather than importing
// its component files, to keep the Coupons module decoupled.
export const apiSearchMembershipOptions = async (search: string) => {
  try {
    const response = await api.get<IGlobalResponseDto<MembershipOptionItem[]>>(
      "/admin/membership/list",
      { params: { page: 1, limit: 20, search_by: "name", search } },
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};
