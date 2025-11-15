// 🔹 Register Request
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "SENDER" | "RECEIVER";
}

// 🔹 Register Response
export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
      role: "SENDER" | "RECEIVER" | "ADMIN";
      status: "ACTIVE" | "INACTIVE";
    };
  };
}

// 🔹 Profile (GET /users/me)
export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: {
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
  };
}