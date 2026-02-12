import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

import { MonthNavigator } from "./MonthNavigator";

import "./CategoriesToolbar.css";

interface Props {}

export const CategoriesToolbar = ({}: Props) => {
  const startContent = (
    <>
      <Button label="New Category" className="primary" />
    </>
  );

  const endContent = <MonthNavigator className="secondary" />;

  return (
    <div className={"budget-categories-toolbar "}>
      <Toolbar start={startContent} end={endContent} />
    </div>
  );
};
