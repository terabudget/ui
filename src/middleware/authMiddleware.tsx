import { redirect, type MiddlewareFunction } from "react-router";
import { isAccessTokenValid, refreshToken } from "../api/AuthApi";
import { lsUtil } from "../util/localStorageUtil";

/**
 * Manage authentication with refresh and auth tokens.
 */
export const authMiddleware: MiddlewareFunction = async () => {
  const auth = lsUtil.getAuth();

  if (!auth) {
    localStorage.clear();
    throw redirect("/");
  }

  if (await isAccessTokenValid(auth.accessToken)) return;

  const authResponse = await refreshToken(auth.refreshToken);
  if (!authResponse) {
    localStorage.clear();
    throw redirect("/");
  }

  lsUtil.setAuth(authResponse);
};
