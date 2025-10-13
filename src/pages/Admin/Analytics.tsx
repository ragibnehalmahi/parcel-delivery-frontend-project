 import React from 'react';
import { useGetParcelStatsQuery, } from '@/redux/features/parcels/parcel.api';
import { Package, Users, Truck, CheckCircle, XCircle, TrendingUp, Clock } from 'lucide-react';
import { useGetUserStatsQuery } from '@/redux/features/users/user.api';

interface UserStats {
  totalUsers: number;
  blockedUsers: number;
  newUsersLast30Days: number;
  activeUsers: number;
}

interface ParcelStats {
  totalParcels: number;
  deliveredCount: number;
  inTransitCount: number;
  approvedCount: number;
  returnedCount: number;
  cancelledCount: number;
  requestedCount: number;
}

const Analytics = () => {
  const { data: userStatsData, isLoading: userLoading, error: userError } = useGetUserStatsQuery(undefined);
  const { data: parcelStatsData, isLoading: parcelLoading, error: parcelError } = useGetParcelStatsQuery(undefined);

  if (userLoading || parcelLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (userError || parcelError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Analytics</h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  const userStats: UserStats = userStatsData?.data || {
    totalUsers: 0,
    blockedUsers: 0,
    newUsersLast30Days: 0,
    activeUsers: 0
  };

  const parcelStats: ParcelStats = parcelStatsData?.data || {
    totalParcels: 0,
    deliveredCount: 0,
    inTransitCount: 0,
    approvedCount: 0,
    returnedCount: 0,
    cancelledCount: 0,
    requestedCount: 0
  };

  // Calculate percentages
  const deliveredPercentage = parcelStats.totalParcels > 0 
    ? Math.round((parcelStats.deliveredCount / parcelStats.totalParcels) * 100)
    : 0;

  const activeUserPercentage = userStats.totalUsers > 0
    ? Math.round(((userStats.totalUsers - userStats.blockedUsers) / userStats.totalUsers) * 100)
    : 0;

  const statsCards = [
    {
      title: 'Total Users',
      value: userStats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Registered users on platform',
      trend: userStats.newUsersLast30Days > 0 ? `+${userStats.newUsersLast30Days} this month` : 'No new users'
    },
    {
      title: 'Active Users',
      value: (userStats.totalUsers - userStats.blockedUsers).toLocaleString(),
      percentage: activeUserPercentage,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Currently active users',
      trend: `${activeUserPercentage}% of total`
    },
    {
      title: 'Total Parcels',
      value: parcelStats.totalParcels.toLocaleString(),
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'All parcels managed',
      trend: 'All time total'
    },
    {
      title: 'Delivered',
      value: parcelStats.deliveredCount.toLocaleString(),
      percentage: deliveredPercentage,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Successfully delivered',
      trend: `${deliveredPercentage}% success rate`
    }
  ];

  const parcelStatusCards = [
    {
      title: 'In Transit',
      value: parcelStats.inTransitCount.toLocaleString(),
      icon: Truck,
      color: 'text-blue-600',
      description: 'Currently moving'
    },
    {
      title: 'Approved',
      value: parcelStats.approvedCount.toLocaleString(),
      icon: CheckCircle,
      color: 'text-yellow-600',
      description: 'Waiting for pickup'
    },
    {
      title: 'Requested',
      value: parcelStats.requestedCount.toLocaleString(),
      icon: Clock,
      color: 'text-orange-600',
      description: 'Pending approval'
    },
    {
      title: 'Cancelled',
      value: parcelStats.cancelledCount.toLocaleString(),
      icon: XCircle,
      color: 'text-red-600',
      description: 'Cancelled parcels'
    },
    {
      title: 'Returned',
      value: parcelStats.returnedCount.toLocaleString(),
      icon: XCircle,
      color: 'text-red-600',
      description: 'Returned to sender'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Real-time insights into your delivery operations</p>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                {stat.percentage && (
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {stat.percentage}%
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
              <p className="text-xs text-gray-500">{stat.description}</p>
              <p className="text-xs text-blue-600 mt-2">{stat.trend}</p>
            </div>
          ))}
        </div>

        {/* Parcel Status Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Parcel Status Cards */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Parcel Status Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {parcelStatusCards.map((stat, index) => (
                <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.color.replace('text', 'bg')} bg-opacity-10 mb-3`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-600">{stat.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Insights */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Insights</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-blue-900">Delivery Performance</p>
                  <p className="text-sm text-blue-700">{deliveredPercentage}% success rate</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-900">User Engagement</p>
                  <p className="text-sm text-green-700">{activeUserPercentage}% active users</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-medium text-purple-900">Monthly Growth</p>
                  <p className="text-sm text-purple-700">{userStats.newUsersLast30Days} new users</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Metrics */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">User Metrics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Total Registered</span>
                <span className="font-bold text-gray-900">{userStats.totalUsers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Active Users</span>
                <span className="font-bold text-green-600">{(userStats.totalUsers - userStats.blockedUsers).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Blocked Users</span>
                <span className="font-bold text-red-600">{userStats.blockedUsers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">New This Month</span>
                <span className="font-bold text-blue-600">+{userStats.newUsersLast30Days.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Parcel Metrics */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Parcel Metrics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Total Parcels</span>
                <span className="font-bold text-gray-900">{parcelStats.totalParcels.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">In Delivery Pipeline</span>
                <span className="font-bold text-blue-600">
                  {(parcelStats.inTransitCount + parcelStats.approvedCount + parcelStats.requestedCount).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Successfully Delivered</span>
                <span className="font-bold text-green-600">{parcelStats.deliveredCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Failed/Cancelled</span>
                <span className="font-bold text-red-600">
                  {(parcelStats.cancelledCount + parcelStats.returnedCount).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-2xl font-bold text-green-600 mb-2">{deliveredPercentage}%</div>
              <div className="text-sm text-gray-600">Delivery Success Rate</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-blue-600 mb-2">{activeUserPercentage}%</div>
              <div className="text-sm text-gray-600">User Activity Rate</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {userStats.newUsersLast30Days > 0 ? '+' : ''}{userStats.newUsersLast30Days}
              </div>
              <div className="text-sm text-gray-600">Monthly User Growth</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
