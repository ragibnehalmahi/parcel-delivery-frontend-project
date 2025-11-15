import ProfilePage from "@/pages/MyProfile/ProfilePage";
import { type ISidebarItem } from "@/type";  

import ParcelCreate from "@/pages/Sender/ParcelCreate";  
import ViewCreatedParcelsAll from "@/pages/Sender/ViewCreatedParcelsAll";  
import ViewDeliveryHistory from "@/pages/Receiver/ViewDeliveryHistory";
import ViewIncomingParcels from "@/pages/Receiver/ViewIncomingParcels";

// ✅ Sender Sidebar
export const senderSidebarItems: ISidebarItem[] = [
  {
    title: "Sender",
    items: [
      {
        title: "My Profile",
        url: "/sender/myprofile",
        component: ProfilePage,
      },
      {
        title: "Parcel Create",
        url: "/sender/parcel-create",
        component: ParcelCreate,
      },
      {
        title: "View All Created Parcels",
        url: "/sender/viewallcreatedparcels",
        component: ViewCreatedParcelsAll,
      },
    ],
  },
];

// ✅ Receiver Sidebar
export const receiverSidebarItems: ISidebarItem[] = [
  {
    title: "Receiver",
    items: [
      {
        title: "My Profile",
        url: "/receiver/myprofile",
        component: ProfilePage,
      },
      {
        title: "View Delivery History",
        url: "/receiver/delivered",
        component: ViewDeliveryHistory,
      },
      {
        title: "View Incoming Parcels",
        url: "/receiver/incoming-parcels",
        component: ViewIncomingParcels,
      }, 
    ],
  },
];

