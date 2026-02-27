import * as z from "zod";

export const BankAccountCreateRequest = z
  .object({
    name: z.string().min(1),
    isOnBudget: z.boolean(),
  })
  .required();

export type BankAccountCreateRequest = z.infer<typeof BankAccountCreateRequest>;
