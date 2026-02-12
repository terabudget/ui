import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { BudgetCategory } from "../../model/BudgetCategory";
import { getBudgetCategories } from "../../api/BudgetCategoryAPI";
import type { BudgetCategoryGroup } from "../../model/BudgetCategoryGroup";

interface BudgetCategoryContextInterface {
  categoryGroups: BudgetCategoryGroup[];
  expandedGroups: BudgetCategoryGroup[];
  setCategoryGroups: (groups: BudgetCategoryGroup[]) => void;
  toggleGroupExpanded: (groupId: string) => void;
  updateCategoryGroup: (category: BudgetCategoryGroup) => void;
}

const BudgetCategoryContext = createContext<
  BudgetCategoryContextInterface | undefined
>(undefined);

export const useBudgetCategoryContext = () => {
  const context = useContext(BudgetCategoryContext);
  if (context === undefined) {
    throw new Error(
      "useBudgetCategory must be used within a BudgetCategoryProvider",
    );
  }
  return context;
};

export default BudgetCategoryContext;

interface BudgetCategoryProviderProps {
  children: ReactNode | ReactNode[];
}

/**
 * The BudgetCategory provider is responsible for providing a state that manages budget categories.
 *
 * @param param0
 * @returns
 */
export const BudgetCategoryProvider = ({
  children,
}: BudgetCategoryProviderProps) => {
  const [categoryGroups, setCategoryGroups] = useState<BudgetCategoryGroup[]>(
    [],
  );

  const [expandedGroups, setExpandedGroups] = useState<BudgetCategoryGroup[]>(
    [],
  );

  const updateCategoryGroup = (categoryGroup: BudgetCategoryGroup) => {
    const newCategoryGroups = categoryGroups.map((g) => {
      if (g.id === categoryGroup.id) {
        return categoryGroup;
      }
      return g;
    });
    setCategoryGroups(newCategoryGroups);
    // const update = Object.assign([], categories) as BudgetCategory[];
    // update[index] = category;
    // setCategories(update);
  };

  const toggleGroupExpanded = (groupId: string) => {
    const newGroups = expandedGroups.filter((g) => g.id !== groupId);
    if (newGroups.length === expandedGroups.length) {
      const groupToAdd = categoryGroups.find((cg) => cg.id === groupId);
      groupToAdd && newGroups.push(groupToAdd);
    }
    setExpandedGroups(newGroups);
  };

  useEffect(() => {
    getBudgetCategories().then((response) => setCategoryGroups(response));
  }, []);

  return (
    <BudgetCategoryContext.Provider
      value={{
        categoryGroups,
        expandedGroups,
        setCategoryGroups,
        toggleGroupExpanded,
        updateCategoryGroup,
      }}
    >
      {children}
    </BudgetCategoryContext.Provider>
  );
};
