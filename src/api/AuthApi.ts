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
  console.log("Token", token)
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
  const loginRequest = RefreshTokenRequest.safeParse(request);

  if (!loginRequest.success) {
    return null;
  }

  const axiosResult = await budgetAxios.post(
    "/api/auth/refresh-token",
    JSON.stringify(loginRequest.data)
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
  const loginRequest = LoginRequest.safeParse({
    clientId: import.meta.env.VITE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CLIENT_SECRET,
    password: request.password,
    username: request.username,
  });

  if (!loginRequest.success) {
    console.log(loginRequest.error);
    return null;
  }
  console.log("Sending ", JSON.stringify(loginRequest.data));
  const axiosResult = await budgetAxios.post(
    "/api/auth/signup",
    JSON.stringify(loginRequest.data)
  );

  const decodeOutcome = AuthResponse.safeDecode(JSON.parse(axiosResult.data));
  if (!decodeOutcome.success) {
    console.error(
      "Could not parse the response from the API",
      axiosResult,
      decodeOutcome.error
    );
    return {
      accessToken: "",
      refreshToken: "",
      error: "There was a problem calling the API",
    };
  }
  return decodeOutcome.data;
};

export const signIn = async (
  request: SignInRequest
): Promise<AuthResponse | null> => {
  const loginRequest = LoginRequest.safeParse({
    clientId: import.meta.env.VITE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CLIENT_SECRET,
    password: request.password,
    username: request.username,
  });

  if (!loginRequest.success) {
    return null;
  }

  const axiosResult = await budgetAxios.post(
    "/api/auth/signin",
    JSON.stringify(loginRequest.data)
  );
  const decodeOutcome = AuthResponse.safeDecode(JSON.parse(axiosResult.data));
  if (!decodeOutcome.success) {
    console.error(
      "Could not parse the response from the API",
      axiosResult,
      decodeOutcome.error
    );
    return {
      accessToken: "",
      refreshToken: "",
      error: "There was a problem calling the API",
    };
  }
  return decodeOutcome.data;
};
