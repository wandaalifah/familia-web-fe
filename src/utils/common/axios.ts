import { errorMessage } from "./server-action";

export const handleAxiosError = (error: any) => {
  return errorMessage(error);
};