import { Button } from "primereact/button";

import { useNavigate } from "react-router";

interface Props {}

export const BankAccountsToolbar = ({}: Props) => {
  const nav = useNavigate();

  return (
    <div className={"bank-accounts-toolbar "}>
      <Button
        label="New Account"
        className="primary p-0"
        size="small"
        onClick={() => nav("/app/accounts/create")}
      />
    </div>
  );
};
