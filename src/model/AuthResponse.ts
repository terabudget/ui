import * as z from "zod";

export const AuthResponse = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type AuthResponse = z.infer<typeof AuthResponse>;
