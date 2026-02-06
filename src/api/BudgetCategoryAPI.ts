import type { BudgetCategory } from "../model/BudgetCategory";
import { budgetAxios } from "./budgetAxios";

export const getBudgetCategories = async (): Promise<BudgetCategory[]> =>
  budgetAxios
    .get("/budget-categories")
    .then((response) => JSON.parse(response.data));
