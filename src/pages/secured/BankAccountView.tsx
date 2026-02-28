import { useBankAccountContext } from "../../components/provider/BankAccountProvider";
import { useParams, useSearchParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import type { BankAccount } from "../../model/BankAccount";

export const BankAccountView = () => {
  const toast = useRef<Toast>(null);
  const { getAccount } = useBankAccountContext();

  const [account, setAccount] = useState<BankAccount>();

  const { accountId } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    accountId &&
      getAccount(accountId)
        .then((bankAccount: BankAccount | undefined) => {
          if (bankAccount) {
            setAccount(bankAccount);
          }
        })
        .catch((e: Error | unknown) => {
          toast.current?.show({
            severity: "error",
            detail:
              e instanceof Error ? e.message : "Failed to retrieve account",
            life: 3000,
          });
        });

    if (searchParams.get("isCreated") === "true") {
      toast.current?.show({
        severity: "success",
        detail: "Account created successfully",
        life: 3000,
      });
    }

    if (searchParams.get("isUpdated") === "true") {
      toast.current?.show({
        severity: "success",
        detail: "Account updated successfully",
        life: 3000,
      });
    }
  }, [searchParams, accountId]);

  return (
    <>
      <Toast ref={toast} />
      <h1 className="text-2xl font-bold pb-4 text-heading">{account?.name}</h1>
      <h2>{account?.onBudget ? "On Budget" : "Off Budget"}</h2>
      View an account with id {accountId} {searchParams.get("isCreated")}
    </>
  );
};
