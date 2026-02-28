import { BankAccountTable } from "../../components/bank-account/BankAccountTable";
import { useBankAccountContext } from "../../components/provider/BankAccountProvider";
import { BankAccountsToolbar } from "../../components/bank-account/BankAccountsToolbar";
import type { BankAccount } from "../../model/BankAccount";
import { useEffect, useState } from "react";

interface BankAccountsByType {
  offBudget: BankAccount[];
  onBudget: BankAccount[];
}

export const BankAccounts = () => {
  const { accounts } = useBankAccountContext();

  const [accountsByType, setAccountsByType] = useState<BankAccountsByType>({
    onBudget: [],
    offBudget: [],
  });

  const recalculateAccounts = (accounts: BankAccount[]) => {
    const accountsByTypeLocal = accounts.reduce<BankAccountsByType>(
      (acc, account) => {
        if (account.onBudget) {
          acc.onBudget.push(account);
        } else {
          acc.offBudget.push(account);
        }
        return acc;
      },
      { onBudget: [], offBudget: [] },
    );
    setAccountsByType(accountsByTypeLocal);
  };

  useEffect(() => {
    console.log("Recalculating accounts by type with accounts", accounts);
    recalculateAccounts(accounts);
  }, [accounts]);

  const accountBudgetSection = (
    title: string,
    sectionAccounts: BankAccount[],
  ) => (
    <>
      <h1 className="text-2xl font-bold pb-4 text-heading">{title}</h1>
      {sectionAccounts.length === 0 ? (
        <p className="text-muted mt-2 mb-4">No accounts in this section yet</p>
      ) : (
        <BankAccountTable accounts={sectionAccounts} className="pt-2 pb-4" />
      )}
    </>
  );

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="col-span-1">
        <BankAccountsToolbar />
      </div>
      <div className="col-span-1">
        <h1 className="text-2xl font-bold pb-4 text-heading">Summary</h1>
        Some information here about the total balance, graphs over time, etc.
      </div>
      <div className="col-span-1">
        {accountBudgetSection("On Budget Accounts", accountsByType.onBudget)}
      </div>
      <div className="col-span-1">
        {accountBudgetSection("Off Budget Accounts", accountsByType.offBudget)}
      </div>
    </div>
  );
};
