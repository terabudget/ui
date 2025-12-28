import { redirect, type MiddlewareFunction } from "react-router";
import { isAccessTokenValid, refreshToken } from "../api/AuthApi";
import { setAuth } from "../util/localStorageUtil";

/**
 * Manage authentication with refresh and auth tokens.
 */
export const authMiddleware: MiddlewareFunction = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (await isAccessTokenValid(accessToken)) return;

  const localRefreshToken = localStorage.getItem("refreshToken");
  if (!localRefreshToken) {
    localStorage.clear();
    throw redirect("/");
  }

  const authResponse = await refreshToken(localRefreshToken);

  if (!authResponse) {
    localStorage.clear();
    throw redirect("/");
  }

  setAuth(authResponse);
};
