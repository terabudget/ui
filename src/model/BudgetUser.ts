import * as z from "zod";
import { UsernameField } from "./fields/authFields";

export const BudgetUser = z.object({
  id: z.string(),
  email: z.string().optional(),
  username: UsernameField,
});

export type BudgetUser = z.infer<typeof BudgetUser>;
