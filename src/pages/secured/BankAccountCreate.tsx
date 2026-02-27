import { BankAccountTable } from "../../components/bank-account/BankAccountTable";
import { useBankAccountContext } from "../../components/provider/BankAccountProvider";
import { BankAccountsToolbar } from "../../components/bank-account/BankAccountsToolbar";
import { useNavigate, useParams } from "react-router";
import { BankAccountEditForm } from "../../components/bank-account/BankAccountEditForm";
import { createBankAccount } from "../../api/BankAccountAPI";
import type { BankAccountCreateRequest } from "../../model/BankAccountCreateRequest";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { BankAccountCreateForm } from "../../components/bank-account/BankAccountCreateForm";

export const BankAccountCreate = () => {
  const toast = useRef<Toast>(null);
  const nav = useNavigate();

  const doSave: (account: BankAccountCreateRequest) => void = async (
    req: BankAccountCreateRequest,
  ) => {
    try {
      await createBankAccount(req);
    } catch (e) {
      toast.current?.show({
        severity: "error",
        detail: "Failed to create account",
        life: 3000,
      });
      return;
    }
    nav("/app/accounts/123?isCreated=true");
  };

  return (
    <>
      <Toast ref={toast} />
      <h1 className="text-2xl font-bold pb-4 text-heading">New Account</h1>
      <BankAccountCreateForm onSave={doSave} />
    </>
  );
};
