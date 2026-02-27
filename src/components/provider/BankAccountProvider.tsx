import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { BankAccount } from "../../model/BankAccount";
import {
  createBankAccount,
  getBankAccounts,
} from "../../api/BankAccountAPI";
import type { BankAccountCreateRequest } from "../../model/BankAccountCreateRequest";

interface BankAccountContextInterface {
  accounts: BankAccount[];
  createAccount: (account: BankAccountCreateRequest) => void;
  setAccounts: (accounts: BankAccount[]) => void;
  updateAccount: (account: BankAccount) => void;
}

const BankAccountContext = createContext<
  BankAccountContextInterface | undefined
>(undefined);

export const useBankAccountContext = () => {
  const context = useContext(BankAccountContext);
  if (context === undefined) {
    throw new Error(
      "useBankAccount must be used within a BankAccountProvider",
    );
  }
  return context;
};

export default BankAccountContext;

interface BankAccountProviderProps {
  children: ReactNode | ReactNode[];
}

/**
 * The BankAccount provider is responsible for providing a state that manages bank accounts.
 *
 * @param param0
 * @returns
 */
export const BankAccountProvider = ({
  children,
}: BankAccountProviderProps) => {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);

  const createAccount = async (account: BankAccountCreateRequest) => {
    await createBankAccount(account);
    const accounts = await getBankAccounts();
    setAccounts(accounts);
  };

  const updateAccount = (account: BankAccount) => {
    const newAccounts = accounts.map((a) => {
      if (a.id === account.id) {
        return account;
      }
      return a;
    });
    setAccounts(newAccounts);
  };

  useEffect(() => {
    getBankAccounts().then((response) => setAccounts(response));
  }, []);

  return (
    <BankAccountContext.Provider
      value={{
        accounts,
        createAccount,
        setAccounts,
        updateAccount,
      }}
    >
      {children}
    </BankAccountContext.Provider>
  );
};
