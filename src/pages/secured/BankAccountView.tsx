import { BankAccountTable } from "../../components/bank-account/BankAccountTable";
import { useBankAccountContext } from "../../components/provider/BankAccountProvider";
import { BankAccountsToolbar } from "../../components/bank-account/BankAccountsToolbar";
import { useParams, useSearchParams } from "react-router";
import { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";

export const BankAccountView = () => {
  const toast = useRef<Toast>(null);
  const { accounts } = useBankAccountContext();

  const { accountId } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
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
  }, [searchParams]);

  return (
    <>
      <Toast ref={toast} />
      <h1 className="text-2xl font-bold pb-4 text-heading">Summary</h1>
      View an account with id {accountId} {searchParams.get("isCreated")}
    </>
  );
};
