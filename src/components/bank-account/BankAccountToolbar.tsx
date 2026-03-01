import { Button } from "primereact/button";

import { useNavigate, useParams } from "react-router";
import type { BankAccount } from "../../model/BankAccount";
import { useEffect, useState } from "react";
import { useBankAccountContext } from "../provider/BankAccountProvider";
import { useCommonUIContext } from "../provider/CommonUIProvider";

interface Props {}

export const BankAccountToolbar = ({}: Props) => {
  const { getAccount, reopenAccount } = useBankAccountContext();
  const { toast } = useCommonUIContext();
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
  }, [accountId, account]);

  const doReopen = async () => {
    try {
      await reopenAccount(accountId!);
      toast({
        severity: "success",
        detail: "Account reopened successfully",
        life: 3000,
      });
    } catch (e) {
      toast({
        severity: "error",
        detail: e instanceof Error ? e.message : "Failed to reopen account",
        life: 3000,
      });
    }
  };

  return (
    <div className={"bank-account-toolbar"}>
      {account && !account.closed && (
        <Button
          label="Close Account"
          className="warn p-0"
          size="small"
          onClick={() => nav(`/app/accounts/${accountId}/close`)}
        />
      )}
      {account && account.closed && (
        <Button
          label="Reopen Account"
          className="warn p-0"
          size="small"
          onClick={doReopen}
        />
      )}
    </div>
  );
};
