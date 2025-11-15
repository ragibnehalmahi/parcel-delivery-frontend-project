import App from "@/App";
import FAQPage from "@/pages/FAQPage";
import AboutPage from "@/pages/AboutPage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import HelpCenterPage from "@/pages/HelpCenterPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import HomePage from "@/pages/HomePage";
import UnauthorizedPage from "@/pages/UnauthorizedPage";
import CareersPage from "@/pages/CareersPage";
import ContactPage from "@/pages/ContactPage";
import ProfilePage from "@/pages/MyProfile/ProfilePage";

import { createBrowserRouter, Navigate } from "react-router-dom";
import { withAuth } from "@/utils/withAuth";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { role } from "@/constants/role";
import { generateRoutes } from "@/utils/generateRoutes";
import { receiverSidebarItems, senderSidebarItems } from "./usersSidebarItems";
import type { TRole } from "@/type";
import { adminSidebarItems } from "./adminSidebarItems";
import TrackParcelPage from "@/pages/TrackParcelPage";
 

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "contact", Component: ContactPage },
      { path: "careers", Component: CareersPage },
      { path: "terms-service", Component: TermsOfServicePage },
      { path: "frequently-asked-questions", Component: FAQPage },
      { path: "help-center", Component: HelpCenterPage },
    ],
  },

  // ===================== SENDER ROUTES =====================
  {
    path: "/sender",
    Component: withAuth(DashboardLayout, role.Sender as TRole),
    children: [
      { index: true, element: <Navigate to="/sender/parcelcreate" /> },
      ...generateRoutes(senderSidebarItems),
      {
        path: "myprofile",
        Component: withAuth(ProfilePage),
      },
    ],
  },

  // ===================== RECEIVER ROUTES =====================
  {
    path: "/receiver",
    Component: withAuth(DashboardLayout, role.Receiver as TRole),
    children: [
      { index: true, element: <Navigate to="/receiver/viewincomingparcels" /> },
      ...generateRoutes(receiverSidebarItems),
      {
        path: "myprofile",
        Component: withAuth(ProfilePage),
      },
    ],
  },
  {
        Component: withAuth(DashboardLayout, role.Admin as TRole),
        path: "/admin",
        children: [
            { index: true, element: <Navigate to="/admin/analytics" /> },
            ...generateRoutes(adminSidebarItems),
            {
                path: "myprofile",
                Component: withAuth(ProfilePage),
            },


        ],

    },
  // ===================== AUTH ROUTES =====================
  { path: "/login", Component: LoginPage },
  { path: "/register", Component: RegisterPage },
  { path: "/unauthorized", Component: UnauthorizedPage },
  {path:"/track-parcel", Component: TrackParcelPage},
]);
