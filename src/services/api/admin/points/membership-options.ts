"use server";

import { IGlobalResponseDto } from "@/src/interfaces/global/pagination/response";
import { api } from "../../../satellite";
import { handleAxiosError } from "@/src/utils/common/axios";

// Minimal shape for the Adjust Points member picker — kept local to this
// module rather than importing the Membership module's own types/hooks.
export interface IMembershipOption {
  id: string;
  points: number;
  users: {
    id: string;
    first_name: string;
    last_name: string;
  };
}

export const apiSearchMembershipOptions = async (search: string) => {
  try {
    const response = await api.get<IGlobalResponseDto<IMembershipOption[]>>(
      "/admin/membership/list",
      {
        params: search
          ? { page: 1, limit: 20, search_by: "name", search }
          : { page: 1, limit: 20 },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};
