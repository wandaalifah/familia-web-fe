export interface IGetListPetQuery {
  page: number;
  limit: number;
  sort_by?: "created_at" | "name" | "species" | "breed" | "birth_date";
  sort_order?: "asc" | "desc";
  search_by?: "name" | "species" | "breed" | "owner";
  search?: string;
  userId?: string;
  species?: string;
  breed?: string;
  /** UI keeps this as a boolean; the api layer serializes it to "true"/"false". */
  is_neutered?: boolean;
}

export interface PetOwner {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
}

export interface IPet {
  id: string;
  userId: string;
  name: string;
  species: string | null;
  breed: string | null;
  birth_date: Date | string | null;
  is_neutered: boolean;
  avatar: string | null;
  users: PetOwner;
  _count: {
    medical_history: number;
  };
  created_at: Date | string;
  updated_at?: Date | string;
}

export interface IPetMedicalHistoryEntry {
  id: string;
  type: string;
  title: string;
  administered_at: Date | string;
}

export interface IPetDetail extends IPet {
  medical_history: IPetMedicalHistoryEntry[];
}

export interface ICreatePetPayload {
  userId: string;
  name: string;
  species?: string;
  breed?: string;
  birth_date?: string;
  is_neutered?: boolean;
  avatar?: string;
}

export type IUpdatePetPayload = Partial<
  Omit<ICreatePetPayload, "userId">
>;
