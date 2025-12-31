import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { MonthNavigator } from "./MonthNavigator";

interface Props {
  className?: string;
}

export const CategoriesToolbar = ({ className }: Props) => {
  const startContent = (
    <>
      <Button icon="pi pi-plus" label="New" className="mr-2" />
      <Button icon="pi pi-upload" />
    </>
  );

  const endContent = <MonthNavigator />;

  return (
    <div className={className}>
      <Toolbar start={startContent} end={endContent} />
    </div>
  );
};
