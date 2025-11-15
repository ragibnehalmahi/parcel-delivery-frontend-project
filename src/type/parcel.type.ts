import type { AuthUser } from "./auth.type";

 

 

export type ParcelStatus =
  | "Requested"
  | "Approved"
  | "Dispatched"
  | "Picked"
  | "In Transit"
  | "Held"
  | "Delivered"
  | "Returned"
  | "Cancelled";

export interface StatusLog {
  status: ParcelStatus;
  timestamp: string; // ISO date string
  location?: string;
  updatedBy?: AuthUser | string;
  note?: string;
}

export interface Parcel {
  _id: string;
  trackingId: string;
  sender: AuthUser | string;
  receiver: {
    name: string;
    phone: string;
    address: string;
    userId?: string;
    email:string
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
