import { Button } from "primereact/button";
import type { BankAccountCreateRequest } from "../../model/BankAccountCreateRequest";
import { useNavigate } from "react-router";

interface Props {
  onSave?: (req: BankAccountCreateRequest) => void;
}

export const BankAccountEditForm = (props: Props) => {
  const nav = useNavigate();
  return (
    <>
      {" "}
      <div>BankAccountEditForm</div>
      <Button
        label="New Account"
        className="primary"
        onClick={() => nav("/app/accounts")}
      />
    </>
  );
};
