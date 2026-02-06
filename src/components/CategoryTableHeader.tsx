import { useEffect, useState } from "react";
import "./CategoryTableHeader.css";
import {
  TriStateCheckbox,
  type TriStateCheckboxChangeEvent,
} from "primereact/TristateCheckbox";
import { useBudgetCategoryContext } from "./provider/BudgetCategoryProvider";
import { PrimeIcons } from "primereact/api";

export const CategoryTableHeader = () => {
  const [selectAllState, setSelectAllState] = useState<
    boolean | undefined | null
  >();

  const { selectedState, bulkChangeAllSelection } = useBudgetCategoryContext();

  const onSelectAll = async (e: TriStateCheckboxChangeEvent) =>
    bulkChangeAllSelection(!!e.value);

  useEffect(() => setSelectAllState(selectedState), [selectedState]);

  return (
    <div className={`category-table-header grid grid-cols-15 p-2 mb-2`}>
      <div>
        <TriStateCheckbox
          value={selectAllState}
          onChange={onSelectAll}
          uncheckIcon={PrimeIcons.MINUS}
        />
      </div>
      <div className="col-span-6">Category {"" + selectAllState}</div>
      <div className="col-span-2">Spent</div>
      <div className="col-span-2">Available</div>
      <div className="col-span-2">target</div>
      <div className="col-span-2">Assigned</div>
    </div>
  );
};
