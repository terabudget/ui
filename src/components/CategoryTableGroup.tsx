import { Checkbox, type CheckboxChangeEvent } from "primereact/checkbox";
import "./CategoryTableGroup.css";
import type { BudgetCategory } from "../model/BudgetCategory";
import { useEffect, useState } from "react";
import { useBudgetCategoryContext } from "./provider/BudgetCategoryProvider";

interface Props {
  category: BudgetCategory;
  onCategorySelectChange?: (categoryId: string, value: boolean) => void;
}

export const CategoryTableGroup = ({ category }: Props) => {
  const [selected, setSelected] = useState<boolean | undefined>();
  const { updateCategory } = useBudgetCategoryContext();

  const onSelect = (e: CheckboxChangeEvent) => {
    setSelected(e.checked);
    updateCategory({
      ...category,
      selected: !!e.checked,
    });
  };

  useEffect(() => {
    setSelected(!!category.selected);
  }, [category]);

  return (
    <div
      className={`category-table-group grid grid-cols-15 p-2 mt-2 ${
        selected && "bg-background"
      }`}
    >
      <div>
        <Checkbox checked={selected || false} onChange={onSelect} />
      </div>
      <div className="col-span-6">{category.name}</div>
      <div className="col-span-2">Spent</div>
      <div className="col-span-2">Available</div>
      <div className="col-span-2">Target</div>
      <div className="col-span-2">Assigned</div>
    </div>
  );
};
