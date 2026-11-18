"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiArchivePet,
  apiCreatePet,
  apiUpdatePet,
} from "../../../api/admin/pets/list";
import {
  ICreatePetPayload,
  IUpdatePetPayload,
} from "@/src/interfaces/admin/pets/list";
import { isApiError } from "@/src/utils/common/server-action";
import { PET_LIST_KEY } from "../../../query/admin/pets/list";

const useInvalidatePetList = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: [PET_LIST_KEY] });
};

export const useCreatePetMutation = () => {
  const invalidate = useInvalidatePetList();

  return useMutation({
    meta: { successMessage: "Pet registered." },
    mutationFn: async (body: ICreatePetPayload) => {
      const response = await apiCreatePet(body);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data;
    },
    onSuccess: invalidate,
  });
};

export const useUpdatePetMutation = () => {
  const invalidate = useInvalidatePetList();

  return useMutation({
    meta: { successMessage: "Pet profile updated." },
    mutationFn: async ({
      id,
      body,
    }: {
      id: string;
      body: IUpdatePetPayload;
    }) => {
      const response = await apiUpdatePet(id, body);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data;
    },
    onSuccess: invalidate,
  });
};

// Named for the UI action it backs; calls DELETE /admin/pet/delete/:id,
// which soft-deletes the pet server-side.
export const useArchivePetMutation = () => {
  const invalidate = useInvalidatePetList();

  return useMutation({
    meta: { successMessage: "Pet archived." },
    mutationFn: async (id: string) => {
      const response = await apiArchivePet(id);

      if (isApiError(response)) {
        throw new Error(response.error?.message);
      }

      return response.data;
    },
    onSuccess: invalidate,
  });
};
