import { Axios } from "axios";

export const budgetAxios = new Axios({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthHeader = (accessToken: string) => {
  if (!budgetAxios.defaults.headers.common) {
    budgetAxios.defaults.headers.common = {};
  }
  budgetAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

export const clearAuthHeader = () => {
  if (!budgetAxios.defaults.headers.common) {
    budgetAxios.defaults.headers.common = {};
  }
  budgetAxios.defaults.headers.common.Authorization = "";
};
