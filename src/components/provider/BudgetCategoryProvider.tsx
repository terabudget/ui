import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { BudgetCategory } from "../../model/BudgetCategory";
import type { BudgetCategoryMap } from "../../model/BudgetCategoryMap";
import { CategoriesSelectedState } from "../../model/CategorySelectedState";

const TEST_DATA: BudgetCategory[] = [
  {
    group: { id: "g1", name: "G1" },
    displayOrder: 0,
    id: "0",
    name: "Test 0",
  },
  {
    group: { id: "g2", name: "G2" },
    displayOrder: 1,
    id: "1",
    name: "Test 1",
  },
  {
    group: { id: "g1", name: "G1" },
    displayOrder: 2,
    id: "2",
    name: "Test 2",
  },
  {
    group: { id: "g1", name: "G1" },
    displayOrder: 3,
    id: "3",
    name: "Test 3",
  },
];

interface BudgetCategoryContextInterface {
  countTotal: number;
  countSelected: number;
  categories: BudgetCategory[];
  categoryMap: BudgetCategoryMap;
  selectedState: CategoriesSelectedState;
  bulkChangeAllSelection: (selected: boolean) => void;
  setCategories: (categories: BudgetCategory[]) => void;
  updateCategory: (category: BudgetCategory) => void;
}

const BudgetCategoryContext = createContext<
  BudgetCategoryContextInterface | undefined
>(undefined);

export const useBudgetCategoryContext = () => {
  const context = useContext(BudgetCategoryContext);
  if (context === undefined) {
    throw new Error(
      "useBudgetCategory must be used within a BudgetCategoryProvider"
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
  const [categories, setCategoriesLocal] = useState<BudgetCategory[]>([]);
  const [countSelected, setCountSelected] = useState<number>(0);
  const [categoryMap, setCategoryMap] = useState<BudgetCategoryMap>({});
  const [selectedState, setSelectedState] = useState<CategoriesSelectedState>(
    CategoriesSelectedState.NONE
  );

  const setCategories = (newCategories: BudgetCategory[]) => {
    setCategoriesLocal(newCategories);

    const newCountSelected = newCategories.reduce(
      (acc, item) => (acc = acc + (item.selected ? 1 : 0)),
      0
    );

    setCountSelected(countSelected);

    let newSelectedState: CategoriesSelectedState =
      CategoriesSelectedState.NONE;
    if (newCountSelected === categories.length) {
      newSelectedState = CategoriesSelectedState.ALL;
    } else if (newCountSelected < categories.length && newCountSelected > 0) {
      newSelectedState = CategoriesSelectedState.SOME;
    }
    setSelectedState(newSelectedState);

    const map = newCategories.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {} as BudgetCategoryMap);

    setCategoryMap(map);
  };

  const updateCategory = (category: BudgetCategory) => {
    const index = categories.findIndex((c) => c.id == category.id);
    const update = Object.assign([], categories) as BudgetCategory[];
    update[index] = category;
    setCategories(update);
  };

  const bulkChangeAllSelection = (selected: boolean) => {
    const update = categories.map((c) => ({
      ...c,
      selected,
    }));
    setCategories(update);
  };

  useEffect(() => {
    setCategories(TEST_DATA);
  }, [TEST_DATA]);

  return (
    <BudgetCategoryContext.Provider
      value={{
        countTotal: categories.length,
        countSelected,
        categories,
        categoryMap,
        selectedState,

        bulkChangeAllSelection,
        setCategories,
        updateCategory,
      }}
    >
      {children}
    </BudgetCategoryContext.Provider>
  );
};
