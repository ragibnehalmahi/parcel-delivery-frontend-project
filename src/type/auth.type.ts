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
  statusCode?:number
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
export interface IResponse<T = any> {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: T;
  errorSources?: Array<{
    path: string;
    message: string;
  }>;
  stack?: string;
}