import type { BudgetCategoryGroup } from "../model/BudgetCategoryGroup";
import { budgetAxios } from "./budgetAxios";

const TEST_DATA: BudgetCategoryGroup[] = [
  {
    id: "0",
    name: "Group 0",
    categories: [
      {
        id: "a",
        name: "Category 1",
        allocated: 0,
        available: 0
      },
      {
        id: "b",
        name: "Category 2",
        allocated: 0,
        available: 0
      },
    ],
  },
  {
    id: "1",
    name: "Group 1",
  },
];

export const getBudgetCategories = async (): Promise<BudgetCategoryGroup[]> =>
  Promise.resolve(TEST_DATA);
// budgetAxios
//   .get("/budget-categories")
//   .then((response) => JSON.parse(response.data));
