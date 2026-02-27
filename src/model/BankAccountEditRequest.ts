import * as z from "zod";

export const BankAccountEditRequest = z.object({
  name: z.string().optional(),
});

export type BankAccountEditRequest = z.infer<typeof BankAccountEditRequest>;
