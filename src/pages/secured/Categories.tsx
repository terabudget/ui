import { CategoryTable } from "../../components/CategoryTable";
import { CategoriesToolbar } from "../../components/CategoriesToolbar";
import { BudgetCategoryProvider } from "../../components/provider/BudgetCategoryProvider";

export const Categories = () => {
  return (
    <BudgetCategoryProvider>
      <CategoriesToolbar />
      <CategoryTable />
    </BudgetCategoryProvider>
  );
};
