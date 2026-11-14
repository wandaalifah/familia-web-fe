import axios from "axios";
import qs from "qs";
import { clearSession, getSession, setSession } from "../session/session";
import { env } from "../config/env";
import { apiRefreshToken } from "../api/login/user";
import {
  getLoginPathByRole,
  getRoleFromToken,
  redirectToLogin,
} from "@/src/utils/common/auth-redirect";

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
    // Only attach a token when one exists — never send "Bearer undefined"
    if (session?.accessToken) {
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
    const requestUrl: string = error.config?.url ?? "";
    const isRefreshTokenRequest = requestUrl.includes("/refresh-token");
    const isCredentialRequest =
      requestUrl.includes("/auth/login") || requestUrl.includes("/auth/register");
    const status = error.response?.status;

    // Non-auth errors are passed through untouched
    if (status !== 401 && status !== 403) {
      throw error;
    }

    // A 401/403 from login/register means invalid credentials, not an expired
    // session — surface the error to the caller so the form can show it
    // instead of refreshing the token or redirecting back to the login page.
    if (isCredentialRequest) {
      throw error;
    }

    // Read the session BEFORE it gets cleared so every redirect sends the user
    // to the login page matching the role in their last token
    // (admin → /admin/login, customer → /member).
    const session = await getSession();
    const loginPath = getLoginPathByRole(
      getRoleFromToken(session.accessToken ?? session.refreshToken),
    );

    // Handle 403 (refresh token expired) or 401/403 on refresh endpoint
    if (status === 403 || (status === 401 && isRefreshTokenRequest)) {
      if (typeof globalThis.window !== "undefined") {
        redirectToLogin(loginPath);
        return new Promise(() => {}); // Prevent further execution
      }
      clearSession();
      throw error;
    }

    // Handle 401 (access token expired) - try to refresh
    // Check if we've already tried refreshing for this request
    if (error.config._hasRefreshed) {
      if (typeof globalThis.window !== "undefined") {
        redirectToLogin(loginPath);
      }
      clearSession();
      throw error;
    }

    try {
      const res = await apiRefreshToken(session.refreshToken!);
      if (res.status === true) {
        await setSession(res.data.token);
        // retry the request with flag to prevent infinite loop
        const retryConfig = {
          ...error.config,
          _hasRefreshed: true,
        };
        return api.request(retryConfig);
      } else {
        // refresh returned false status
        if (typeof globalThis.window !== "undefined") {
          redirectToLogin(loginPath);
        }
        clearSession();
        throw error;
      }
    } catch (refreshError) {
      // refresh token failed
      if (typeof globalThis.window !== "undefined") {
        redirectToLogin(loginPath);
      }
      clearSession();
      // Attach the resolved login path so client-side handling (isApiError)
      // can still redirect after the session cookies have been cleared.
      const sessionExpiredError = new Error(
        "refresh token expired",
      ) as Error & { loginPath?: string };
      sessionExpiredError.loginPath = loginPath;
      throw sessionExpiredError;
    }
  },
);
