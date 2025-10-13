import React, { useState } from 'react';
import { useGetDeliveredParcelsQuery } from '@/redux/features/parcels/parcel.api';
import { Package, Calendar, User, MapPin, Eye, CheckCircle } from 'lucide-react';

interface Parcel {
  _id: string;
  trackingId: string;
  parcelType: string;
  weight: number;
  currentStatus: string;
  sender: {
    name: string;
    email: string;
    phone: string;
  };
  receiver: {
    name: string;
    email: string;
    phone: string;
    address: string;
    userId?: string;
  };
  deliveryAddress: string;
  updatedAt: string;
  estimatedDeliveryDate: string;
}

const ViewDeliveryHistory = () => {
  const { data: parcelsData, isLoading, error } = useGetDeliveredParcelsQuery(undefined);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const parcels = parcelsData?.data || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading History</h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Delivery History
            </h1>
            <p className="text-gray-600 text-lg">
              Your previously delivered packages ({parcels.length} items)
            </p>
          </div>
        </div>

        {/* Parcels List */}
        {parcels.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Delivery History</h3>
            <p className="text-gray-600">You haven't received any parcels yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {parcels.map((parcel: Parcel) => (
              <div
                key={parcel._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Left Section */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">
                            {parcel.trackingId}
                          </h3>
                          <p className="text-gray-600">{parcel.parcelType}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          Delivered
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <User className="h-4 w-4 mr-2" />
                          <span>From: {parcel.sender.name}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Package className="h-4 w-4 mr-2" />
                          <span>Weight: {parcel.weight} kg</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Delivered: {formatDate(parcel.updatedAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedParcel(parcel);
                          setShowDetails(true);
                        }}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Parcel Details Modal */}
        {showDetails && selectedParcel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">Delivery Details</h3>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Status Banner */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-green-800">Successfully Delivered</h4>
                      <p className="text-green-600 text-sm">
                        Delivered on {formatDate(selectedParcel.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Parcel Information */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 border-b pb-2">Parcel Information</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-600 text-sm block">Tracking ID</span>
                        <p className="font-medium text-lg">{selectedParcel.trackingId}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm block">Parcel Type</span>
                        <p className="font-medium">{selectedParcel.parcelType}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm block">Weight</span>
                        <p className="font-medium">{selectedParcel.weight} kg</p>
                      </div>
                    </div>
                  </div>

                  {/* Sender Information */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 border-b pb-2">Sender Information</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-600 text-sm block">Name</span>
                        <p className="font-medium">{selectedParcel.sender.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm block">Email</span>
                        <p className="font-medium">{selectedParcel.sender.email}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm block">Phone</span>
                        <p className="font-medium">{selectedParcel.sender.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 border-b pb-2 flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Delivery Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600 text-sm block">Recipient</span>
                      <p className="font-medium">{selectedParcel.receiver.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm block">Phone</span>
                      <p className="font-medium">{selectedParcel.receiver.phone}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm block">Delivery Address</span>
                      <p className="font-medium mt-1 bg-gray-50 p-3 rounded text-sm">
                        {selectedParcel.deliveryAddress}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowDetails(false)}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDeliveryHistory;