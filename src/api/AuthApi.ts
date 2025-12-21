import type { BudgetUser } from "../model/BudgetUser";

export const isAuthenticated = async (): Promise<boolean> => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken !== null;
};
