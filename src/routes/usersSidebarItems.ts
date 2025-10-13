import ProfilePage from "@/pages/MyProfile/ProfilePage";
import ViewDeliveryHistory from "@/pages/Receiver/ViewDeliveryHistory";
import ViewIncomingParcels from "@/pages/Receiver/ViewIncomingParcels";
import { ISidebarItem } from "@/type";  
 
import ParcelCreate from "@/pages/Sender/ParcelCreate";  
import ListAllCreatedParcels from "@/pages/Sender/ListAllCreatedParcels";  
 

export const receiverSidebarItems : ISidebarItem[] = [
    {
      title: "Receiver",
      items: [
        {
          title: "My Profile",
          url: "/receiver/myprofile",
          component:ProfilePage,
        },
        {
          title: "View Delivery History",
          url: "/receiver/viewdeliveryhistory",
          component:ViewDeliveryHistory,
        },
        {
          title: "View Incoming Parcels",
          url: "/receiver/viewincomingparcels",
          component:ViewIncomingParcels,
        },
      ],
    },
    
  ]
 
export const senderSidebarItems : ISidebarItem[] = [
    {
      title: "Sender",
      items: [
        {
          title: "My Profile",
          url: "/sender/myprofile",
          component:ProfilePage,
        },
        {
          title: "Parcel Create",
          url: "/sender/parcelcreate",
          component:ParcelCreate,
        },
       
        {
          title: "View AllCreated Parcels",
          url: "/sender/listallcreatedparcels",
          component:ListAllCreatedParcels,
        },
      ],
    },
    
  ]