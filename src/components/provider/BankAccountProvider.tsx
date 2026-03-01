import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { BankAccount } from "../../model/BankAccount";
import {
  closeBankAccount,
  createBankAccount,
  getBankAccount,
  getBankAccounts,
  reopenBankAccount,
} from "../../api/BankAccountAPI";
import type { BankAccountCreateRequest } from "../../model/BankAccountCreateRequest";

interface BankAccountContextInterface {
  accounts: BankAccount[];

  closeAccount: (id: string) => Promise<BankAccount>;
  createAccount: (account: BankAccountCreateRequest) => Promise<BankAccount>;
  getAccount: (id: string) => Promise<BankAccount | undefined>;
  refreshAccounts: () => void;
  reopenAccount: (id: string) => Promise<BankAccount>;
  setAccounts: (accounts: BankAccount[]) => void;
  updateAccount: (account: BankAccount) => void;
}

const BankAccountContext = createContext<
  BankAccountContextInterface | undefined
>(undefined);

export const useBankAccountContext = () => {
  const context = useContext(BankAccountContext);
  if (context === undefined) {
    throw new Error("useBankAccount must be used within a BankAccountProvider");
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
export const BankAccountProvider = ({ children }: BankAccountProviderProps) => {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);

  const refreshAccounts = async () => {
    const newAccounts = await getBankAccounts();
    setAccounts(newAccounts);
  };

  const createAccount = async (account: BankAccountCreateRequest) => {
    const newAccount = await createBankAccount(account);
    await refreshAccounts();
    return newAccount;
  };

  const closeAccount = async (id: string) => {
    const account = await closeBankAccount(id);
    await refreshAccounts();
    return account;
  };

  const reopenAccount = async (id: string) => {
    const account = await reopenBankAccount(id);
    await refreshAccounts();
    return account;
  };

  const getAccount = async (id: string) => {
    const account = await getBankAccount(id);
    return account;
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
    refreshAccounts();
  }, []);

  return (
    <BankAccountContext.Provider
      value={{
        accounts,
        closeAccount,
        createAccount,
        getAccount,
        refreshAccounts,
        reopenAccount,
        setAccounts,
        updateAccount,
      }}
    >
      {children}
    </BankAccountContext.Provider>
  );
};
