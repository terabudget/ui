import type { BudgetUser } from "../model/BudgetUser";

export const getUser = async (): Promise<BudgetUser> => {
  const accessToken = localStorage.getItem("accessToken");

  // Placeholder implementation
  return {
    id: "1",
    email: "user@example.com",
    name: "John Doe",
  };
};
