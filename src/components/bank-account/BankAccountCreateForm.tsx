import { Button } from "primereact/button";
import type { BankAccountCreateRequest } from "../../model/BankAccountCreateRequest";
import { BankAccountCreateRequest as BankAccountCreateRequestModel } from "../../model/BankAccountCreateRequest";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";

interface Props {
  onSave?: (req: BankAccountCreateRequest) => void;
}

export const BankAccountCreateForm = (props: Props) => {
  const toast = useRef<Toast>(null);

  const [newAccount, setNewAccount] = useState<BankAccountCreateRequest>({
    name: "",
    onBudget: false,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedAccount = BankAccountCreateRequestModel.parse(newAccount);
      props.onSave && props.onSave(parsedAccount);
    } catch (e: Error | unknown) {
      toast.current?.show({
        severity: "error",
        detail: e instanceof Error ? e.message : "Failed to create account",
        life: 3000,
      });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <div className="col-span-1">
            <InputText
              placeholder="Account Name"
              value={newAccount.name}
              onChange={(e) =>
                setNewAccount((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="col-span-1">
            <Checkbox
              checked={newAccount.onBudget}
              inputId="is-on-budget"
              onChange={(e) =>
                setNewAccount((prev) => ({
                  ...prev,
                  onBudget: e.checked ? true : false,
                }))
              }
            />
            <label htmlFor="is-on-budget" className="ml-2">
              Is On Budget
            </label>
          </div>
          <div className="col-span-1">
            <Button label="Create" className="primary" type="submit" />
          </div>
        </div>
      </form>
    </>
  );
};
