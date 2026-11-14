export interface IRegisterAdminRequest {
  email: string;
  password: string;
  phone: string;
  first_name: string;
  last_name: string;
}

export type IRegisterAdminResponse = {
  message: string;
} | null;
