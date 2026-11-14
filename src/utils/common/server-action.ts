import { IGlobalResponseDto } from "@/src/interfaces/global/pagination/response";
import { IGlobalPaginationDto } from "@/src/interfaces/global/pagination/pagination";
import { AxiosError } from "axios";
import { redirectToLogin } from "@/src/utils/common/auth-redirect";
export type IApiError = {
  error: {
    message: string;
    status: number;
    data?: unknown;
    /** Role-based login path resolved by the auth interceptor before the session was cleared. */
    loginPath?: string;
  };
  data: any;
};

const extraErrorMessage = (error: unknown) => {
  // check type of error string, object, array
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (Array.isArray(error)) {
    return error.join(", ");
  }

  return "Something went wrong";
};

export const errorMessage = (error: unknown) => {
  // Preserves the role-based login path attached by the auth interceptor
  const loginPath = (error as { loginPath?: string } | null)?.loginPath;

  if (error instanceof AxiosError) {
    return {
      error: {
        message:
          error.response?.data?.error ??
          error.response?.data?.message ??
          "Something went wrong",
        status: error.response?.status,
        data: error.response?.data,
        loginPath,
      },
      data: error.response?.data,
    } as IApiError;
  }

  const errorMessage = extraErrorMessage(error);

  return {
    error: {
      message: errorMessage,
      status: 500,
      loginPath,
    },
    data: null,
  };
};

type ApiResponse<T> =
  | {
      data: T | null;
      pagination?: IGlobalPaginationDto | null;
      error: null;
    }
  | {
      data: null;
      pagination: null;
      error: IApiError["error"];
    };

export function extractResponse<T>(
  res: IGlobalResponseDto<T> | IApiError,
): ApiResponse<T> {
  if ("error" in res && res.error) {
    return { data: null, pagination: null, error: res.error };
  }

  const isPaginated = "pagination" in res;

  return {
    data: res.data,
    pagination: isPaginated ? res.pagination : null,
    error: null,
  };
}

export function isApiError(response: any): response is IApiError {
  if (
    "error" in response &&
    response.error !== undefined &&
    response.error.message === "refresh token expired"
  ) {
    // Redirect to the login page matching the token role
    // (admin → /admin/login, customer → /member); the path was resolved
    // server-side before the session cookies were cleared.
    redirectToLogin(response.error.loginPath);
  }
  return "error" in response && response.error !== undefined;
}
