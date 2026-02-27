import type { BankAccount } from "../model/BankAccount";
import type { BankAccountCreateRequest } from "../model/BankAccountCreateRequest";
import { budgetAxios } from "./budgetAxios";

export const getBankAccounts = async (): Promise<BankAccount[]> =>
  budgetAxios
    .get("/bank-accounts")
    .then((response) => JSON.parse(response.data));

export const createBankAccount = async (
  req: BankAccountCreateRequest,
): Promise<BankAccount> =>
  budgetAxios.post("/bank-accounts", JSON.stringify(req)).then((response) => {
    if (response.status !== 200) {
      throw new Error("Failed to create account");
    }
    return JSON.parse(response.data);
  });
