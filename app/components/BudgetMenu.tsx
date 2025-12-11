import { Menu } from "primereact/menu";
import type { BankAccount } from "~/model/BankAccount";

export function BankAccountMenu({
  bankAccounts,
}: {
  bankAccounts: BankAccount[];
}) {
  const items = bankAccounts.map((account) => ({
    label: "Accounts",
    items: [{ label: account.name, icon: "pi pi-circle" }],
  }));
  return <Menu model={items} />;
}
