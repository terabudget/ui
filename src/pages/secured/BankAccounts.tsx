import { BankAccountTable } from "../../components/bank-account/BankAccountTable";
import { useBankAccountContext } from "../../components/provider/BankAccountProvider";
import { BankAccountsToolbar } from "../../components/bank-account/BankAccountsToolbar";
import type { BankAccount } from "../../model/BankAccount";
import { useEffect, useState } from "react";
import { useCommonUIContext } from "../../components/provider/CommonUIProvider";

interface BankAccountsByType {
  offBudget: BankAccount[];
  onBudget: BankAccount[];
  closed: BankAccount[];
}

export const BankAccounts = () => {
  const { accounts } = useBankAccountContext();
  const { toast } = useCommonUIContext();

  const [accountsByType, setAccountsByType] = useState<BankAccountsByType>({
    onBudget: [],
    offBudget: [],
    closed: [],
  });

  const recalculateAccounts = (accounts: BankAccount[]) => {
    const accountsByTypeLocal = accounts.reduce<BankAccountsByType>(
      (acc, account) => {
        if (account.closed) {
          acc.closed.push(account);
        } else if (account.onBudget) {
          acc.onBudget.push(account);
        } else {
          acc.offBudget.push(account);
        }
        return acc;
      },
      { onBudget: [], offBudget: [], closed: [] },
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
    <>
      <div className="grid grid-cols-1 gap-8">
        <div className="col-span-1 h-12 pt-4">
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
          {accountBudgetSection(
            "Off Budget Accounts",
            accountsByType.offBudget,
          )}
        </div>
        {accountsByType.closed.length > 0 && (
          <div className="col-span-1">
            {accountBudgetSection("Closed Accounts", accountsByType.closed)}
          </div>
        )}{" "}
      </div>
    </>
  );
};
