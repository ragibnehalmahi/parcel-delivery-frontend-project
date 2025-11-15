import type { ComponentType } from "react";
export * from "./auth.type";
export * from "./user.type";
export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}
export type TRole = "Admin" | "Sender" | "Receiver";
