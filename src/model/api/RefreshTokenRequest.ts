import * as z from "zod";

export const RefreshTokenRequest = z.object({
  refreshToken: z.string(),
  clientId: z.string(),
  clientSecret: z.string(),
});

export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequest>;
