import { Button } from "primereact/button";
import { BankAccountMenu } from "~/components/BudgetMenu";
import type { BankAccount } from "~/model/BankAccount";
import type { Route } from "../../+types/root";

export function PostLoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
