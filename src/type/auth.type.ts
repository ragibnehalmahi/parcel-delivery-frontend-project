// 🔹 Login Request
export interface LoginRequest {
  email: string;
  password: string;
}

// 🔹 User Info (Nested in login response)
export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  phone: string | null;
  picture: string | null;
  address: string | null;
  role: "ADMIN" | "SENDER" | "RECEIVER";
  status: "ACTIVE" | "INACTIVE";
  isDeleted: boolean;
  isVerified: boolean;
  location: string | null;
  authProviders: string[];
  createdAt: string;
  updatedAt: string;
}

// 🔹 Login Response
export interface LoginResponse {
  success: boolean;
  message: string;
  statusCode:number;
  data: {
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
  };
}

// 🔹 Logout Request
export interface LogoutRequest {
  refreshToken: string;
}

// 🔹 Logout Response
export interface LogoutResponse {
  success: boolean;
  message: string;
  data: {
    message: string;
  };
}