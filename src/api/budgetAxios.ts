import { Axios } from "axios";

export const budgetAxios = new Axios({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
