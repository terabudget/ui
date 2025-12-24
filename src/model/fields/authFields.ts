import * as z from "zod";

export const UsernameField = z.string().min(2).max(20);
export type UsernameField = z.infer<typeof UsernameField>;

export const PasswordField = z.string().min(10).max(255);
export type PasswordField = z.infer<typeof PasswordField>;