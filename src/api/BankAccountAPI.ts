import { HttpStatusCode } from "axios";
import type { BankAccount } from "../model/BankAccount";
import type { BankAccountCreateRequest } from "../model/BankAccountCreateRequest";
import { budgetAxios } from "./budgetAxios";

export const getBankAccount = async (
  id: string,
): Promise<BankAccount | undefined> => {
  const response = await budgetAxios.get(`/bank-accounts/${id}`);
  switch (response.status) {
    case HttpStatusCode.Ok:
      return JSON.parse(response.data);
    case HttpStatusCode.NotFound:
      return undefined;
    default:
      throw new Error("Failed to get account");
  }
};

export const getBankAccounts = async (): Promise<BankAccount[]> => {
  const response = await budgetAxios.get("/bank-accounts");
  console.log("accounts refreshed response.data.length", JSON.parse(response.data.length));
  return JSON.parse(response.data);
};

export const createBankAccount = async (
  req: BankAccountCreateRequest,
): Promise<BankAccount> => {
  const response = await budgetAxios.post(
    "/bank-accounts",
    JSON.stringify(req),
  );

  switch (response.status) {
    case HttpStatusCode.Created:
      return JSON.parse(response.data);
    case HttpStatusCode.Conflict:
      throw new Error("Account already exists");
    default:
      throw new Error("Failed to create account");
  }
};
