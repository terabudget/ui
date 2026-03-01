import { useBankAccountContext } from "../../components/provider/BankAccountProvider";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { BankAccount } from "../../model/BankAccount";
import { Button } from "primereact/button";
import { useCommonUIContext } from "../../components/provider/CommonUIProvider";

export const BankAccountClose = () => {
  const { toast } = useCommonUIContext();
  const { closeAccount, getAccount } = useBankAccountContext();

  const nav = useNavigate();

  const [account, setAccount] = useState<BankAccount>();

  const { accountId } = useParams();

  useEffect(() => {
    accountId &&
      getAccount(accountId).then((bankAccount: BankAccount | undefined) => {
        if (bankAccount) {
          setAccount(bankAccount);
        }
      });
  }, [accountId]);

  const onCloseAccount = async () => {
    try {
      await closeAccount(accountId!);
      toast({
        severity: "success",
        summary: "Success",
        detail: "AASDSADASDSccount closed successfully",
      });

      nav("/app/accounts");
    } catch (error: Error | unknown) {
      toast({
        severity: "error",
        summary: "Error",
        detail:
          error instanceof Error ? error.message : "Failed to close account",
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-8">
        <div className="col-span-1 h-12 pt-4" />
        <div className="col-span-1">
          <h1 className="text-2xl font-bold pb-4 text-heading">
            Close Account
          </h1>
          Are you sure you want to close the account {account?.name}? The
          account will be archived and will no longer appear in your budget.
        </div>
        <div className="col-span-1">
          <Button
            label="Close Account"
            className="warn p-0"
            size="small"
            onClick={onCloseAccount}
          />
          <Button
            label="Cancel"
            className="secondary p-0"
            size="small"
            onClick={() => nav(`/app/accounts/${accountId}`)}
          />
        </div>
      </div>
    </>
  );
};
