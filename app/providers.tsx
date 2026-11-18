"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import {
  notifyMutationError,
  notifyMutationSuccess,
  notifyQueryError,
  notifyQuerySuccess,
} from "@/src/utils/common/query-toast";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // Every API query/mutation reports its outcome through react-toastify here,
        // so individual hooks and components don't need their own toast calls.
        queryCache: new QueryCache({
          onError: notifyQueryError,
          onSuccess: (_data, query) => notifyQuerySuccess(query),
        }),
        mutationCache: new MutationCache({
          onError: (error, _variables, _context, mutation) =>
            notifyMutationError(error, mutation),
          onSuccess: (data, _variables, _context, mutation) =>
            notifyMutationSuccess(data, mutation),
        }),
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer position="top-right" autoClose={4000} newestOnTop />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
