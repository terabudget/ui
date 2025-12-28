import { AuthResponse } from "../model/AuthResponse";

export const setAuth = (auth: AuthResponse) => {
  localStorage.setItem("accessToken", auth.accessToken);
  localStorage.setItem("refreshToken", auth.refreshToken);
};
