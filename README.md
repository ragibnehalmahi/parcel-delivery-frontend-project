# Parcel Delivery System Frontend

![Parcel Delivery System](https://img.shields.io/badge/React-Parcel%20Delivery-blue?style=for-the-badge&logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-Frontend-blue?style=for-the-badge&logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-Styling-blue?style=for-the-badge&logo=tailwind-css) ![RTK Query](https://img.shields.io/badge/RTK%20Query-State%20Management-orange?style=for-the-badge&logo=redux)

A modern, responsive frontend application for a comprehensive Parcel Delivery System built with React, TypeScript, and Tailwind CSS. This project implements role-based access for senders, receivers, and admins, featuring parcel creation, tracking, management, and real-time updates.

## 🌟 Features

### 🔐 Authentication & Authorization
- **Role-Based Login/Register**: Support for Admin, Sender, and Receiver roles with automatic redirection.
- **JWT Authentication**: Secure token-based authentication with auto-refresh.
- **Protected Routes**: Role-specific access control for dashboards and features.

### 📦 Parcel Management
- **Create Parcels**: Intuitive form for senders to create parcels with receiver details, weight, type, and delivery address.
- **View Parcels**: Role-specific parcel lists (My Parcels for senders, Incoming for receivers, All Parcels for admins).
- **Update Parcels**: Edit parcel details (type, weight, address) for senders.
- **Cancel Parcels**: Senders can cancel parcels in "Requested" status.
- **Confirm Delivery**: Receivers can confirm parcel receipt.
- **Block/Unblock Parcels**: Admins can manage parcel status.
- **Parcel Tracking**: Public tracking by tracking ID with status logs.
- **Delivery History**: View completed deliveries with timestamps.

### 📊 Analytics & Stats
- **Admin Dashboard**: User and parcel statistics (total users, deliveries, etc.).
- **Parcel Stats**: Overview of parcel statuses (delivered, cancelled, in-transit).

### 🎨 User Interface
- **Responsive Design**: Mobile-first approach with Tailwind CSS.
- **Dark/Light Mode**: Theme toggle for better user experience.
- **Interactive Tables**: Sortable, filterable tables with pagination using TanStack Table.
- **Modals & Forms**: Shadcn/ui components for consistent UI.
- **Real-Time Updates**: RTK Query for efficient data fetching and caching.

### 🛠️ Additional Features
- **Search & Filter**: Global search across parcel lists.
- **Notifications**: Toast notifications for actions (success/error).
- **Loading States**: Skeleton loaders for better UX.
- **Error Handling**: Comprehensive error messages and fallbacks.

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit (RTK Query for API calls)
- **Styling**: Tailwind CSS with Shadcn/ui components
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Ready for Vercel/Netlify

## 📋 Prerequisites

Before running this project, ensure you have:
- Node.js (v18 or higher)
- npm or yarn
- Backend API running (refer to backend repository for setup)

## 🚀 Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/parcel-delivery-frontend.git
   cd parcel-delivery-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api/v1
   VITE_ADMIN_MAIL=admin@example.com
   VITE_ADMIN_PASSWORD=admin123
   VITE_SENDER_MAIL=sender@example.com
   VITE_SENDER_PASSWORD=sender123
   VITE_RECEIVER_MAIL=receiver@example.com
   VITE_RECEIVER_PASSWORD=receiver123
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The app will run on `http://localhost:5173`.

## 📖 Usage

### For Users:
1. **Register/Login**: Choose your role (Sender/Receiver) and create an account or login.
2. **Dashboard Access**: Based on role, access specific features:
   - **Sender**: Create parcels, view/edit/cancel your parcels.
   - **Receiver**: View incoming parcels, confirm deliveries, check history.
   - **Admin**: Manage all users/parcels, view analytics.

### Key Workflows:
- **Create Parcel**: Fill the form with receiver details → Submit → Get tracking ID.
- **Track Parcel**: Use public tracking page with tracking ID.
- **Manage Parcels**: Use tables to view, edit, or delete parcels.

### Demo Credentials:
- **Admin**: admin@example.com / admin123
- **Sender**: sender@example.com / sender123
- **Receiver**: receiver@example.com / receiver123

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout/          # Common, Dashboard layouts
│   ├── modules/         # Feature-specific components (Auth, Home, etc.)
│   └── ui/              # Reusable UI components (Shadcn/ui)
├── pages/               # Route-based pages
├── redux/               # Store, slices, API endpoints
├── types/               # TypeScript interfaces
├── utils/               # Helpers (auth, routes, etc.)
├── hooks/               # Custom hooks
└── config/              # Constants and configs
```

## 🔗 API Integration

The frontend integrates with a RESTful backend API using RTK Query. Key endpoints include:
- **Auth**: `/auth/login`, `/auth/logout`, `/users/register`
- **Parcels**: `/parcel/create`, `/parcel/my-parcels`, `/parcel/incoming-parcels`, etc.
- **Users**: `/users/allusers`, `/users/stats`

Ensure the backend is running for full functionality.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m 'Add your feature'`.
4. Push to branch: `git push origin feature/your-feature`.
5. Open a Pull Request.

 

## 📞 Contact

- **Developer**: Ragib Nehal Mahi
- **Email**: ragibnehalmahi504@gmail.com
- **GitHub**: [https://github.com/ragibnehalmahi](https://github.com/your-username)
- **LinkedIn**: [https://bd.linkedin.com/in/ragib-nehal-mahi-mahi-867936261](https://linkedin.com/in/your-profile)

---

⭐ If you find this project helpful, please give it a star on GitHub! Happy coding! 🚀
