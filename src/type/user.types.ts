<<<<<<< HEAD
// src/types/user.types.ts

export enum UserRole {
  ADMIN = "ADMIN",
  SENDER = "SENDER",
  RECEIVER = "RECEIVER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}

export interface IAuthProvider {
  provider: string;
  providerId: string;
}

export interface IUserLocation {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string; // 👈 optional because frontend won't receive passwords
  phone: string;
  picture?: string | null;
  address?: string | null;
  role: UserRole;
  status?: UserStatus;
  isDeleted?: boolean;
  isVerified?: boolean;
  authProviders?: IAuthProvider[];
  location?: IUserLocation;
  createdAt?: string;
  updatedAt?: string;
}
=======
// src/types/user.types.ts

export enum UserRole {
  ADMIN = "ADMIN",
  SENDER = "SENDER",
  RECEIVER = "RECEIVER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}

export interface IAuthProvider {
  provider: string;
  providerId: string;
}

export interface IUserLocation {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string; // 👈 optional because frontend won't receive passwords
  phone: string;
  picture?: string | null;
  address?: string | null;
  role: UserRole;
  status?: UserStatus;
  isDeleted?: boolean;
  isVerified?: boolean;
  authProviders?: IAuthProvider[];
  location?: IUserLocation;
  createdAt?: string;
  updatedAt?: string;
}
>>>>>>> 83f810d1e4f52bcfb5248d889b25b62f8f7b5a8b
