import { IGlobalResponseDto } from "@/src/interfaces/global/pagination/response";
import { IGlobalPaginationDto } from "@/src/interfaces/global/pagination/pagination";
import { AxiosError } from "axios";
export type IApiError = {
  error: {
    message: string;
    status: number;
    data?: unknown;
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
  if (error instanceof AxiosError) {
    return {
      error: {
        message:
          error.response?.data?.error ??
          error.response?.data?.message ??
          "Something went wrong",
        status: error.response?.status,
        data: error.response?.data,
      },
      data: error.response?.data,
    } as IApiError;
  }

  const errorMessage = extraErrorMessage(error);

  return {
    error: {
      message: errorMessage,
      status: 500,
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
    const currentPath = globalThis.window.location.pathname;
    globalThis.window.location.href = `/login?redirectTo=${encodeURIComponent(currentPath)}`;
  }
  return "error" in response && response.error !== undefined;
}
