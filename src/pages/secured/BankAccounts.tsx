import { BankAccountTable } from "../../components/bank-account/BankAccountTable";
import { useBankAccountContext } from "../../components/provider/BankAccountProvider";
import { BankAccountsToolbar } from "../../components/bank-account/BankAccountsToolbar";

export const BankAccounts = () => {
  const { accounts } = useBankAccountContext();

  const accountsByType = accounts.reduce(
    (acc, account) => {
      if (account.isOnBudget) {
        acc.onBudget.push(account);
      } else {
        acc.offBudget.push(account);
      }
      return acc;
    },
    { onBudget: [], offBudget: [] } as {
      onBudget: typeof accounts;
      offBudget: typeof accounts;
    },
  );

  return (
    <>
      <BankAccountsToolbar />
      <h1 className="text-2xl font-bold pb-4 text-heading">Summary</h1>
      <h1 className="text-2xl font-bold pb-4 text-heading">
        On Budget Accounts
      </h1>
      <BankAccountTable accounts={accountsByType.onBudget} className="pt-2 pb-4" />
      <h1 className="text-2xl font-bold pb-4 text-heading">
        Off Budget Accounts
      </h1>
      <BankAccountTable accounts={accountsByType.offBudget} className="pt-2 pb-4" />
    </>
  );
};
