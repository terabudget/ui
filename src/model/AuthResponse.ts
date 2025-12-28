import * as z from "zod";

export const AuthResponse = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  error: z.string().optional()
});

export type AuthResponse = z.infer<typeof AuthResponse>;
