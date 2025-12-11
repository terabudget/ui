import { Button } from "primereact/button";
import { BankAccountMenu } from "~/components/BudgetMenu";
import type { BankAccount } from "~/model/BankAccount";

export function PostLoginHome({ bankAccounts }: { bankAccounts: BankAccount[] }) {
  console.log("Loader Data:", bankAccounts);
  return (
    <>
      <Button label="Welcome" />
    </>
  );
}
