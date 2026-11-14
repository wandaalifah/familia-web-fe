import { jwtDecode } from "jwt-decode";

// Login page per role: admins sign in at /admin/login, customers at /member
const ADMIN_LOGIN_PATH = "/admin/login";
const CUSTOMER_LOGIN_PATH = "/member";

/**
 * Extract the role from a JWT. Checks the `role` claim first and falls back to
 * `role_id`. Returns "" when the token is missing or cannot be decoded.
 */
export const getRoleFromToken = (token?: string | null): string => {
  if (!token) {
    return "";
  }

  try {
    const decoded = jwtDecode<{ role?: string; role_id?: string }>(token);
    return String(decoded.role ?? decoded.role_id ?? "").toLowerCase();
  } catch {
    return "";
  }
};

/** Map a token role to its login page (unknown roles fall back to the member login). */
export const getLoginPathByRole = (role: string): string =>
  role.includes("admin") ? ADMIN_LOGIN_PATH : CUSTOMER_LOGIN_PATH;

/**
 * Client-only redirect to the role's login page, keeping the current path as
 * `redirectTo` so the user can continue where they left off after logging in.
 */
export const redirectToLogin = (loginPath: string = CUSTOMER_LOGIN_PATH) => {
  if (typeof globalThis.window === "undefined") {
    return;
  }

  const currentPath = globalThis.window.location.pathname;
  globalThis.window.location.replace(
    `${loginPath}?redirectTo=${encodeURIComponent(currentPath)}`,
  );
};
