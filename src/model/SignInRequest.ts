import * as z from "zod";
import { PasswordField, UsernameField } from "./fields/authFields";

export const SignInRequest = z.object({
  username: UsernameField,
  password: PasswordField,
});

export type SignInRequest = z.infer<typeof SignInRequest>;
