"use server";

import { IUserData } from "@/src/interfaces/global/pagination/session";
import { ITokenResponse } from "@/src/interfaces/user/login";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const setSession = async (token: ITokenResponse) => {
  const cookieStore = await cookies();
  cookieStore.set("access_token", token.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  cookieStore.set("refresh_token", token.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
};

export const getSession = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");
  const refreshToken = cookieStore.get("refresh_token");
  return {
    accessToken: accessToken?.value,
    refreshToken: refreshToken?.value,
  };
};

export const getUserData = async () => {
  const token = await getSession();

  const decoded: IUserData = jwtDecode(token.accessToken!);

  return decoded;
};

export const clearSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
};

export const setNeedUpdatePassword = async () => {
  const cookieStore = await cookies();
  cookieStore.set("need_update_password", "true", {
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
};

export const getNeedUpdatePassword = async () => {
  const cookieStore = await cookies();
  const needUpdatePassword = cookieStore.get("need_update_password");
  return needUpdatePassword?.value === "true";
};

export const clearNeedUpdatePassword = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("need_update_password");
};

export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) {
    return true;
  }

  const decoded: IUserData = jwtDecode(token);
  const expirationTimeSeconds = decoded.exp;

  if (!expirationTimeSeconds) {
    return false;
  }

  const nowSeconds = Math.floor(Date.now() / 1000);

  return nowSeconds >= expirationTimeSeconds;
};
