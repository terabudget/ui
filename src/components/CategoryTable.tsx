import { Column } from "primereact/column";
import "./CategoryTable.css";
import {
  DataTable,
  type DataTableRowClickEvent,
  type DataTableRowReorderEvent,
} from "primereact/datatable";
import { useBudgetCategoryContext } from "./provider/BudgetCategoryProvider";
import type { BudgetCategoryGroup } from "../model/BudgetCategoryGroup";
import type { BudgetCategory } from "../model/BudgetCategory";
import { Row } from "primereact/row";
import { ColumnGroup } from "primereact/columngroup";

export const CategoryTable = () => {
  const {
    categoryGroups,
    setCategoryGroups,
    expandedGroups,
    toggleGroupExpanded,
    updateCategoryGroup
  } = useBudgetCategoryContext();

  const reorderCategories = (group: BudgetCategoryGroup, e: DataTableRowReorderEvent<BudgetCategory[]>) => {
    group.categories = e.value;
    updateCategoryGroup(group);
  };

  const reorderGroup = (e: DataTableRowReorderEvent<BudgetCategoryGroup[]>) => {
    setCategoryGroups(e.value);
  };

  const toggleGroup = (e: DataTableRowClickEvent) => {
    toggleGroupExpanded(e.data.id);
    console.log(e.data);
  };

  const rowExpansionTemplate = (group: BudgetCategoryGroup) => {
    return (
      <DataTable
        value={group.categories}
        showHeaders={false}
        reorderableRows
        // tableStyle={{ minWidth: "50rem" }}
        className="budget-category-list"
        onRowReorder={(e) => reorderCategories(group, e)}
      >
        <Column rowReorder style={{ width: '3rem' }} />
        <Column field="id" hidden />
        <Column field="name" />
        <Column field="allocated"  style={{ width: "10rem"}}/>
        <Column field="available"  style={{ width: '10rem' }}/>
      </DataTable>
    );
  };

  const headerColumnGroup = (
    <ColumnGroup>
      <Row>
        <Column style={{ width: '3rem' }} />
        <Column header="Category"/>
        <Column header="Allocated" style={{ width: "10rem"}}/>
        <Column header="Available"  style={{ width: '10rem' }}/>
      </Row>
    </ColumnGroup>
  );

  return (
    <div className="budget-category-table">
      <DataTable
        value={categoryGroups}
        reorderableRows
        expandedRows={expandedGroups}
        headerColumnGroup={headerColumnGroup}
        rowHover
        // frozenValue={frozenRow}
        onRowClick={toggleGroup}
        onRowReorder={reorderGroup}
        tableStyle={{ minWidth: "50rem" }}
        // rowGroupHeaderTemplate={headerTemplate}
        rowExpansionTemplate={rowExpansionTemplate}
      >
        <Column rowReorder style={{ width: "3rem" }} />
        {/* <Column expander /> */}
        <Column field="id" hidden />
        <Column field="name" />
        <Column style={{ width: '10rem' }}/>
        <Column style={{ width: '10rem' }} />
      </DataTable>
    </div>
  );
};
