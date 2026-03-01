import { useNavigate } from "react-router";
import type { BankAccountCreateRequest } from "../../model/BankAccountCreateRequest";
import { BankAccountCreateForm } from "../../components/bank-account/BankAccountCreateForm";
import type { BankAccount } from "../../model/BankAccount";
import { useBankAccountContext } from "../../components/provider/BankAccountProvider";
import { useCommonUIContext } from "../../components/provider/CommonUIProvider";

export const BankAccountCreate = () => {
  const { toast } = useCommonUIContext();
  const nav = useNavigate();

  const { createAccount } = useBankAccountContext();

  const doSave: (account: BankAccountCreateRequest) => void = async (
    req: BankAccountCreateRequest,
  ) => {
    try {
      const newAccount: BankAccount = await createAccount(req);
      toast({
        severity: "success",
        detail: "Account created successfully",
        life: 3000,
      });
      nav("/app/accounts/" + newAccount.id + "?isCreated=true");
    } catch (e: Error | unknown) {
      toast({
        severity: "error",
        detail: e instanceof Error ? e.message : "Failed to create account",
        life: 3000,
      });
      return;
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold pb-4 text-heading">New Account</h1>
      <BankAccountCreateForm onSave={doSave} />
    </>
  );
};
