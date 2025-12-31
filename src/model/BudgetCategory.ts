import type { BudgetCategoryGroup } from "./BudgetCategoryGroup";

export interface BudgetCategory {
  displayOrder: number;
  group: BudgetCategoryGroup;
  id: string;
  name: string;
  selected?: boolean;
}
