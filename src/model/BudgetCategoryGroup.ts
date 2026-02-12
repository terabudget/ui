import type { BudgetCategory } from "./BudgetCategory";

export interface BudgetCategoryGroup {
  id: string;
  name: string;
  categories?: BudgetCategory[]
}
