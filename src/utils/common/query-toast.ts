import { toast } from "react-toastify";
import type { Mutation, Query } from "@tanstack/react-query";

/**
 * Per-hook options read by the global QueryCache / MutationCache handlers
 * (see app/providers.tsx). Set them through the `meta` option of useQuery/useMutation.
 */
declare module "@tanstack/react-query" {
  interface Register {
    queryMeta: ToastMeta;
    mutationMeta: ToastMeta;
  }
}

export interface ToastMeta extends Record<string, unknown> {
  /** Toast shown when the request succeeds. Mutations set it; queries stay quiet unless they opt in. */
  // `any` keeps hooks free to type `data` as their own response shape (parameter bivariance).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  successMessage?: string | ((data: any) => string | undefined);
  /** Suppresses the error toast (e.g. background polling). */
  silentError?: boolean;
}

const SESSION_EXPIRED_MESSAGE = "refresh token expired";
const FALLBACK_ERROR_MESSAGE = "Something went wrong";

const toErrorMessage = (error: unknown): string =>
  error instanceof Error && error.message ? error.message : FALLBACK_ERROR_MESSAGE;

export const notifyQueryError = (error: unknown, query: Query<unknown, unknown, unknown>) => {
  if (query.meta?.silentError) return;
  const message = toErrorMessage(error);
  // The auth flow redirects to login on an expired session; a toast would only be noise.
  if (message === SESSION_EXPIRED_MESSAGE) return;
  // One toast per query key, so retries/refetches don't stack identical errors.
  toast.error(message, { toastId: `query-error:${query.queryHash}` });
};

const resolveSuccessMessage = (
  meta: ToastMeta | undefined,
  data: unknown,
): string | undefined =>
  typeof meta?.successMessage === "function"
    ? meta.successMessage(data)
    : meta?.successMessage;

export const notifyQuerySuccess = (query: Query<unknown, unknown, unknown>) => {
  const message = resolveSuccessMessage(query.meta, query.state.data);
  if (message) toast.success(message, { toastId: `query-success:${query.queryHash}` });
};

export const notifyMutationError = (
  error: unknown,
  mutation: Mutation<unknown, unknown, unknown, unknown>,
) => {
  if (mutation.meta?.silentError) return;
  const message = toErrorMessage(error);
  if (message === SESSION_EXPIRED_MESSAGE) return;
  toast.error(message);
};

export const notifyMutationSuccess = (
  data: unknown,
  mutation: Mutation<unknown, unknown, unknown, unknown>,
) => {
  const message = resolveSuccessMessage(mutation.meta, data);
  if (message) toast.success(message);
};
