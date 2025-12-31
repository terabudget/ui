import "./CategoryTable.css";
import { CategoryTableHeader } from "./CategoryTableHeader";
import { CategoryTableRow } from "./CategoryTableRow";
import { useBudgetCategoryContext } from "./provider/BudgetCategoryProvider";

export const CategoryTable = () => {
  const { categoryMap, categories, updateCategory } =
    useBudgetCategoryContext();

  //   useEffect(() => {
  //     ProductService.getProductsMini().then((data) => setProducts(data));
  //   }, []);

  //   const onReorder = async (
  //     rows: DataTableRowReorderEvent<BudgetCategory[]>
  //   ) => {
  //     console.log("ROWS", rows);
  //     const updatesRequired: BudgetCategoryUpdateRequest[] = rows.value.map(
  //       (val, i) => {
  //         return {
  //           groupId: val.group.id,
  //           displayOrder: i,
  //         };
  //       }
  //     );

  //     console.log(updatesRequired, updatesRequired);

  //     if (updatesRequired.length > 0) {
  //       console.log("Updating", updatesRequired);
  //     }
  //     setData(rows.value);
  //   };

  const onCategorySelectedChange = (categoryId: string, value: boolean) => {
    const found = categoryMap[categoryId];
    if (found) {
      found.selected = value;
      updateCategory(found);
    }
  };

  return (
    <div className="category-table">
      <CategoryTableHeader />
      {categories.map((c) => (
        <CategoryTableRow
          category={c}
          onCategorySelectChange={onCategorySelectedChange}
          key={c.id}
        />
      ))}
      <div className="category-table grid grid-cols-13"></div>
    </div>
  );
};
