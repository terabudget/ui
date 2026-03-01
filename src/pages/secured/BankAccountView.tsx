import { useBankAccountContext } from "../../components/provider/BankAccountProvider";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import type { BankAccount } from "../../model/BankAccount";
import { BankAccountToolbar } from "../../components/bank-account/BankAccountToolbar";
import { useCommonUIContext } from "../../components/provider/CommonUIProvider";

export const BankAccountView = () => {
  const { toast } = useCommonUIContext();
  const { getAccount } = useBankAccountContext();

  const [account, setAccount] = useState<BankAccount>();

  const { accountId } = useParams();

  useEffect(() => {
    accountId &&
      getAccount(accountId)
        .then((bankAccount: BankAccount | undefined) => {
          if (bankAccount) {
            setAccount(bankAccount);
          }
        })
        .catch((e: Error | unknown) => {
          toast({
            severity: "error",
            detail:
              e instanceof Error ? e.message : "Failed to retrieve account",
            life: 3000,
          });
        });
  }, [accountId]);

  return (
    <>
      <div className="grid grid-cols-1 gap-8">
        <div className="col-span-1 h-12 pt-4">
          <BankAccountToolbar />
        </div>
        <div className="col-span-1">
          <h1 className="text-2xl font-bold pb-4 text-heading">Summary</h1>
          Some information here about the total balance, graphs over time, etc.
        </div>
      </div>
    </>
  );
};
