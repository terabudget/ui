import { HttpStatusCode } from "axios";
import { budgetAxios } from "./budgetAxios";
import { AuthResponse } from "../model/AuthResponse";
import { RefreshTokenRequest } from "../model/api/RefreshTokenRequest";
import { LoginRequest } from "../model/api/LoginRequest";
import { SignUpRequest } from "../model/SignUpRequest";
import type { SignInRequest } from "../model/SignInRequest";

export const isAccessTokenValid = async (token: string | null | undefined) => {
  if (!token) {
    return false;
  }
  const axiosResult = await budgetAxios.get("/api/auth/token-valid", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return axiosResult.status === HttpStatusCode.NoContent;
};

export const refreshToken = async (
  token: string
): Promise<AuthResponse | null> => {
  if (!token) {
    return null;
  }
  const request: RefreshTokenRequest = {
    clientId: import.meta.env.VITE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CLIENT_SECRET,
    refreshToken: token,
  };
  const validatedRequest = RefreshTokenRequest.safeParse(request);

  if (!validatedRequest.success) {
    return null;
  }

  const axiosResult = await budgetAxios.post(
    "/api/auth/refresh-token",
    JSON.stringify(validatedRequest.data)
  );
  if (axiosResult.status !== HttpStatusCode.Ok) {
    return null;
  }
  const decodeOutcome = AuthResponse.safeDecode(axiosResult.data);
  if (!decodeOutcome.success) {
    return null;
  }
  return decodeOutcome.data;
};

export const signUp = async (
  request: SignUpRequest
): Promise<AuthResponse | null> => {
  const loginRequest: LoginRequest = {
    clientId: import.meta.env.VITE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CLIENT_SECRET,
    password: request.password,
    username: request.username,
  };
  const validatedRequest = LoginRequest.safeParse(loginRequest);

  if (!validatedRequest.success) {
    return null;
  }

  const axiosResult = await budgetAxios.post(
    "/api/auth/signup",
    JSON.stringify(validatedRequest.data)
  );
  if (axiosResult.status !== HttpStatusCode.Ok) {
    return null;
  }
  const decodeOutcome = AuthResponse.safeDecode(axiosResult.data);
  if (!decodeOutcome.success) {
    return null;
  }
  return decodeOutcome.data;
};

export const signIn = async (
  request: SignInRequest
): Promise<AuthResponse | null> => {
  const loginRequest: LoginRequest = {
    clientId: import.meta.env.VITE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CLIENT_SECRET,
    password: request.password,
    username: request.username,
  };
  const validatedRequest = LoginRequest.safeParse(loginRequest);

  if (!validatedRequest.success) {
    return null;
  }

  const axiosResult = await budgetAxios.post(
    "/api/auth/signin",
    JSON.stringify(validatedRequest.data)
  );
  if (axiosResult.status !== HttpStatusCode.Ok) {
    return null;
  }
  const decodeOutcome = AuthResponse.safeDecode(axiosResult.data);
  if (!decodeOutcome.success) {
    return null;
  }
  return decodeOutcome.data;
};
