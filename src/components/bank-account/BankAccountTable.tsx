import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { BankAccount } from "../../model/BankAccount";
import { useNavigate } from "react-router";
import { Button } from "primereact/button";

interface Props {
  accounts: BankAccount[];
  className?: string;
}

export const BankAccountTable = (props: Props) => {
  const { accounts } = props;

  const nav = useNavigate();

  const formatAccountName = (rowData: BankAccount) => {
    return (
      <Button
        label={rowData.name}
        className="primary"
        text
        onClick={() => nav(`/app/accounts/${rowData.id}`)}
      />
    );
  };

  return (
    <DataTable
      value={accounts}
      className={`budget-accounts-table ${props.className || ""}`}
    >
      <Column field="name" header="Name" body={formatAccountName} />
    </DataTable>
  );
};
