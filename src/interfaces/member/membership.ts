import type { LucideIcon } from "lucide-react";

export interface IMemberProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  memberId: string;
  tier: string;
  points: number;
  nextTierPoints: number;
  nextTierName: string;
  joinDate: string;
  totalVisits: number;
  avatar: string;
}

export interface IRawatInapRecap {
  kondisi: string;
  beratBadan: string;
  suhu: string;
  makan: string;
  pup: string;
  pip: string;
  muntah: string;
  catatan: string;
}

export interface IMedicalRecord {
  id: string;
  date: string;
  weight?: string;
  temp?: string;
  type: string;
  category: string;
  diagnosis?: string;
  treatment: string;
  prescriptions: string[];
  vetName: string;
  clinicLocation: string;
  followUp: string;
  status: string;
  note?: string;
  rawatInapRecap?: IRawatInapRecap;
}

export interface IVaccine {
  id: string;
  name: string;
  dateGiven: string;
  dueDate: string;
  status: string;
  vetName: string;
  clinicLocation: string;
  batchNumber: string;
}

export interface IPet {
  id: string;
  name: string;
  species: string;
  breed: string;
  birthdate: string;
  gender: string;
  weight: string;
  microchipId: string;
  avatar: string;
  lastVisitDate: string;
  medicalHistory: IMedicalRecord[];
  vaccines: IVaccine[];
}

export interface ICoupon {
  id: string;
  title: string;
  pointsCost: number;
  category: string;
  description: string;
  expiryDays: string;
  badge: string;
  icon: LucideIcon;
}

export interface IVoucher {
  id: string;
  title: string;
  code: string;
  expiry: string;
  status: string;
  category: string;
  pointsSpent: number;
}

export interface IPointsLedgerEntry {
  id: string;
  type: "earned" | "spent";
  title: string;
  date: string;
  amount: string;
  reference: string;
  branch: string;
  note: string;
}
