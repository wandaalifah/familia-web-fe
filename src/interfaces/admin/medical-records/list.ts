export type MedicalRecordType =
  | "VACCINE"
  | "DEWORMING"
  | "GROOMING"
  | "RAWAT_INAP"
  | "RAWAT_JALAN";

export interface IGetListMedicalRecordQuery {
  page: number;
  limit: number;
  sort_by?: "created_at" | "administered_at" | "title" | "type" | "next_due_date";
  sort_order?: "asc" | "desc";
  search_by?: "title" | "diagnosis" | "vaccine_name" | "doctor_name";
  search?: string;
  petId?: string;
  userId?: string;
  type?: MedicalRecordType;
  doctor_name?: string;
  startDate?: string;
  endDate?: string;
}

export interface IGetUpcomingDuesQuery {
  page: number;
  limit: number;
  days?: number;
  type?: MedicalRecordType;
}

export interface MedicalRecordPetOwner {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export interface MedicalRecordPet {
  id: string;
  name: string;
  species: string | null;
  users: MedicalRecordPetOwner;
}

export interface IMedicalRecord {
  id: string;
  petId: string;
  type: MedicalRecordType;
  title: string;
  // Main examination
  complaint: string | null;
  clinical_signs: string | null;
  diagnosis: string | null;
  // Vital signs & daily observation
  weight: number | null;
  temperature: number | null;
  appetite: string | null;
  defecation: string | null;
  urination: string | null;
  vomiting: string | null;
  // Treatment, medication & plan
  treatment: string | null;
  prescription: string | null;
  notes: string | null;
  vaccine_name: string | null;
  /** Vaccine dose (1-based); only for VACCINE records. */
  dose_number: number | null;
  administered_at: Date | string;
  next_due_date: Date | string | null;
  /** Set on the last RAWAT_INAP record of an episode. */
  discharged_at: Date | string | null;
  /** Responsible veterinarian (DPJP). */
  doctor_name: string | null;
  /** Staff / in-charge vet who entered the record (initials column). */
  medical_staff_name: string | null;
  pet: MedicalRecordPet;
  created_at: Date | string;
  updated_at: Date | string;
}

/** One entry of the vaccine master data returned by GET /admin/medical-history/vaccines. */
export interface IVaccineCatalogItem {
  name: string;
  audience: "DOG" | "CAT" | "BOTH";
  description: string;
}
