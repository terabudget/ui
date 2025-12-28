import * as z from "zod";
import { PasswordField, UsernameField } from "./fields/authFields";

const baseObject = z.object({
  username: UsernameField,
  password: PasswordField,
  confirmPassword: PasswordField,
});

export const SignUpRequest = baseObject.refine(
  (data) => {
    return data.password === data.confirmPassword;
  },
  {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  }
);

export type SignUpRequest = z.infer<typeof SignUpRequest>;
