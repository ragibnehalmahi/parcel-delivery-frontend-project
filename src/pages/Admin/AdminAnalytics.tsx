import { Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import type { AuthUser } from "@/type/auth.type";
import type { Parcel } from "@/type/parcel.type";

import {
  useAllUsersQuery,
  useAllparcelsQuery,
} from "@/redux/features/auth.api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminAnalytics = () => {
  // Fetch users and parcels
  const { data: usersResponse, isLoading: userLoading } =
    useAllUsersQuery(undefined);

  const { data: parcelsResponse, isLoading: parcelLoading } =
    useAllparcelsQuery(undefined);

  const users: AuthUser[] = usersResponse?.data ?? [];
  const parcels: Parcel[] = parcelsResponse?.data ?? [];

  // User Stats
  const totalUsers = users.length;
  const totalSenders = users.filter((u) => u.role === "SENDER").length;
  const totalReceivers = users.filter((u) => u.role === "RECEIVER").length;
  const totalBlocked = users.filter((u) => u.status === "INACTIVE").length;

  // Parcel Stats
  const totalParcels = parcels.length;

  const deliveredParcels = parcels.filter(
    (p) => p.currentStatus === "Delivered" || p.isDelivered === true
  ).length;

  // Chart Data
  const chartData = [
    { name: "Users", value: totalUsers },
    { name: "Senders", value: totalSenders },
    { name: "Receivers", value: totalReceivers },
    { name: "Inactive", value: totalBlocked },
    { name: "Parcels", value: totalParcels },
    { name: "Delivered", value: deliveredParcels },
  ];

  const isLoading = userLoading || parcelLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold tracking-tight text-center mb-6">
        📊 Admin Analytics Overview
      </h1>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card><CardHeader><CardTitle>Total Users</CardTitle></CardHeader><CardContent><p className="text-3xl font-semibold">{totalUsers}</p></CardContent></Card>

        <Card><CardHeader><CardTitle>Senders</CardTitle></CardHeader><CardContent><p className="text-3xl font-semibold text-blue-600">{totalSenders}</p></CardContent></Card>

        <Card><CardHeader><CardTitle>Receivers</CardTitle></CardHeader><CardContent><p className="text-3xl font-semibold text-green-600">{totalReceivers}</p></CardContent></Card>

        <Card><CardHeader><CardTitle>Inactive Users</CardTitle></CardHeader><CardContent><p className="text-3xl font-semibold text-red-600">{totalBlocked}</p></CardContent></Card>

        <Card><CardHeader><CardTitle>Total Parcels</CardTitle></CardHeader><CardContent><p className="text-3xl font-semibold">{totalParcels}</p></CardContent></Card>

        <Card><CardHeader><CardTitle>Delivered Parcels</CardTitle></CardHeader><CardContent><p className="text-3xl font-semibold text-emerald-600">{deliveredParcels}</p></CardContent></Card>
      </div>

      {/* 📈 Analytics Chart */}
      <div className="mt-10 p-6 border rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">📈 Analytics Chart</h2>

        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
