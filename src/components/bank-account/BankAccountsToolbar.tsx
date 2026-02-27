import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

import "./BankAccountsToolbar.css";
import { useNavigate } from "react-router";

interface Props {}

export const BankAccountsToolbar = ({}: Props) => {
  const nav = useNavigate();
  const startContent = (
    <Button
      label="New Account"
      className="primary"
      onClick={() => nav("/app/accounts/create")}
    />
  );

  return (
    <div className={"budget-accounts-toolbar "}>
      <Toolbar start={startContent} />
    </div>
  );
};
