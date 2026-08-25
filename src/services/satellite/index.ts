import axios from "axios";
import qs from "qs";
import { clearSession, getSession, setSession } from "../session/session";
import { env } from "../config/env";
import { apiRefreshToken } from "../api/login/user";

export const api = axios.create({
  baseURL: env.API.URL,
  withCredentials: true,
  headers: {
    apikey: env.API.KEY,
    "X-Content-Type-Options": "nosniff",
    "X-XSS-Protection": "1; mode=block",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "X-Frame-Options": "SAMEORIGIN",
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, {
      arrayFormat: "repeat",
    });
  },
});

// ── Error logging interceptor ───────────────────────────────────────────────
api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const status = error.response?.status ?? "NO_RESPONSE";
    const method = (error.config?.method ?? "GET").toUpperCase();
    const url = `${error.config?.baseURL ?? ""}${error.config?.url ?? ""}`;
    const responseData = error.response?.data;
    console.error(
      `[API ERR] ${status} ${method} ${url}`,
      responseData === undefined ? "" : JSON.stringify(responseData),
    );
    return Promise.reject(error);
  },
);
// ─────────────────────────────────────────────────────────────────────────────

api.interceptors.request.use(
  async function (config) {
    const session = await getSession();
    if (session) {
      config.headers["Authorization"] = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  async function onFulfilled(response) {
    return response;
  },
  async function onRejected(error) {
    const isRefreshTokenRequest = error.config?.url?.includes("/refresh-token");
    const status = error.response?.status;

    // Handle 403 (refresh token expired) or 401/403 on refresh endpoint
    if (status === 403 || (status === 401 && isRefreshTokenRequest)) {
      if (typeof globalThis.window !== "undefined") {
        const currentPath = globalThis.window.location.pathname;
        const redirectUrl = `/login?redirectTo=${encodeURIComponent(
          currentPath,
        )}`;
        globalThis.window.location.replace(redirectUrl);
        return new Promise(() => {}); // Prevent further execution
      }
      clearSession();
      throw error;
    }

    // Handle 401 (access token expired) - try to refresh
    if (status === 401 && !isRefreshTokenRequest) {
      // Check if we've already tried refreshing for this request
      if (error.config._hasRefreshed) {
        if (typeof globalThis.window !== "undefined") {
          const currentPath = globalThis.window.location.pathname;
          const redirectUrl = `/login?redirectTo=${encodeURIComponent(
            currentPath,
          )}`;
          globalThis.window.location.replace(redirectUrl);
        }
        clearSession();
        throw error;
      }

      try {
        const session = await getSession();
        const res = await apiRefreshToken(session.refreshToken!);
        if (res.status === true) {
          setSession(res.data.token);
          // retry the request with flag to prevent infinite loop
          const retryConfig = {
            ...error.config,
            _hasRefreshed: true,
          };
          return api.request(retryConfig);
        } else {
          // refresh returned false status
          if (typeof globalThis.window !== "undefined") {
            const currentPath = globalThis.window.location.pathname;
            const redirectUrl = `/login?redirectTo=${encodeURIComponent(
              currentPath,
            )}`;
            globalThis.window.location.replace(redirectUrl);
          }
          clearSession();
          throw error;
        }
      } catch (refreshError) {
        // refresh token failed
        if (typeof globalThis.window !== "undefined") {
          const currentPath = globalThis.window.location.pathname;
          const redirectUrl = `/login?redirectTo=${encodeURIComponent(
            currentPath,
          )}`;
          globalThis.window.location.replace(redirectUrl);
        }
        clearSession();
        throw new Error("refresh token expired");
      }
    }

    throw error;
  },
);
