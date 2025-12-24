import * as z from "zod";
import { PasswordField, UsernameField } from "../fields/authFields";

export const LoginRequest = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
  username: UsernameField,
  password: PasswordField,
});

export type LoginRequest = z.infer<typeof LoginRequest>;
