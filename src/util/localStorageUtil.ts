import { AuthResponse } from "../model/AuthResponse";

export const lsUtil = {
  setAuth: (auth: AuthResponse) => {
    localStorage.setItem("accessToken", auth.accessToken);
    localStorage.setItem("refreshToken", auth.refreshToken);
  },

  getAuth: (): AuthResponse | undefined => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      return {
        accessToken,
        refreshToken,
      };
    }
  },
};
