import { redirect, type MiddlewareFunction } from "react-router";
import { isAccessTokenValid, refreshToken } from "../api/AuthApi";
import { lsUtil } from "../util/localStorageUtil";
import { clearAuthHeader, setAuthHeader } from "../api/budgetAxios";

/**
 * Manage authentication with refresh and auth tokens.
 */
export const authMiddleware: MiddlewareFunction = async () => {
  const auth = lsUtil.getAuth();

  if (!auth) {
    localStorage.clear();
    clearAuthHeader();
    throw redirect("/");
  }

  setAuthHeader(auth.accessToken);
  if (await isAccessTokenValid(auth.accessToken)) {
    return;
  }

  clearAuthHeader();
  const authResponse = await refreshToken(auth.refreshToken);

  if (!authResponse) {
    localStorage.clear();
    throw redirect("/");
  }

  setAuthHeader(authResponse.accessToken);
  lsUtil.setAuth(authResponse);
};
