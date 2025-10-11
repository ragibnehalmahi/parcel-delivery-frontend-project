<<<<<<< HEAD
// src/types/auth.types.ts

import { IUser } from "./user.types";

 

export interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: {
    user: IUser;
    tokens: AuthTokens;
  };
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: "SENDER" | "RECEIVER";
}

export interface RefreshTokenResponse {
  success: boolean;
  tokens: AuthTokens;
}

export interface DecodedUser {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}
=======
// src/types/auth.types.ts

import { IUser } from "./user.types";

 

export interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: {
    user: IUser;
    tokens: AuthTokens;
  };
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: "SENDER" | "RECEIVER";
}

export interface RefreshTokenResponse {
  success: boolean;
  tokens: AuthTokens;
}

export interface DecodedUser {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}
>>>>>>> 83f810d1e4f52bcfb5248d889b25b62f8f7b5a8b
