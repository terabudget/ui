import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { BankAccount } from "../../model/BankAccount";

interface Props {
  accounts: BankAccount[];
  className?: string;
}

export const BankAccountTable = (props: Props) => {
  const { accounts } = props;
  return (
    <DataTable
      value={accounts}
      tableStyle={{ minWidth: "50rem" }}
      className={props.className}
    >
      <Column field="name" header="Name"></Column>
    </DataTable>
  );
};
