 

import { IUser } from "./user.types";

 

export enum ParcelStatus {
  REQUESTED = "Requested",
  APPROVED = "Approved",
  DISPATCHED = "Dispatched",
  PICKED = "Picked",
  IN_TRANSIT = "In Transit",
  HELD = "Held",
  DELIVERED = "Delivered",
  RETURNED = "Returned",
  CANCELLED = "Cancelled",
}

export interface StatusLog {
  status: ParcelStatus;
  timestamp: string; // ISO date string
  location?: string;
  updatedBy?: IUser | string;
  note?: string;
}

export interface Parcel {
  _id?: string;
  trackingId: string;
  sender: IUser | string;
  receiver: {
    name: string;
    phone: string;
    address: string;
    userId?: string;
  };
  parcelType: string;
  weight: number;
  deliveryAddress: string;
  currentStatus: ParcelStatus;
  parcelFee?: number;
  estimatedDeliveryDate?: string;
  isCancelled: boolean;
  isDelivered: boolean;
  isBlocked?: boolean;
  statusLogs: StatusLog[];
  createdAt?: string;
  updatedAt?: string;
}

// ✅ DTO types (for frontend forms or API requests)
export interface CreateParcelDTO {
  receiver: {
    name: string;
    phone: string;
    address: string;
    userId?: string;
  };
  parcelType: string;
  weight: number;
  deliveryAddress: string;
}

export interface UpdateParcelStatusDTO {
  status: ParcelStatus;
  location?: string;
  note?: string;
}
