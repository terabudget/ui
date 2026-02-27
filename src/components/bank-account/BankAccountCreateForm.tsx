import { Button } from "primereact/button";
import type { BankAccountCreateRequest } from "../../model/BankAccountCreateRequest";
import { useNavigate } from "react-router";

interface Props {
  onSave?: (req: BankAccountCreateRequest) => void;
}

export const BankAccountCreateForm = (props: Props) => {
  return (
    <>
      <div>BankAccountCreateForm</div>
      <Button
        label="New Account"
        className="primary"
        onClick={() =>
          props.onSave &&
          props.onSave({ name: "New Account", isOnBudget: true })
        }
      />
    </>
  );
};
