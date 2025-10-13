import React, { useState } from 'react';
import { useGetIncomingParcelsQuery, useConfirmParcelMutation } from '@/redux/features/parcels/parcel.api';
import { Package, Truck, CheckCircle, Eye, Search, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

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
  estimatedDeliveryDate: string;
  isBlocked?: boolean;
}

const ViewIncomingParcels = () => {
  const { data: parcelsData, isLoading, error, refetch } = useGetIncomingParcelsQuery(undefined);
  const [confirmParcel] = useConfirmParcelMutation();
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const parcels = parcelsData?.data || [];

  const filteredParcels = parcels.filter((parcel: Parcel) =>
    parcel.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parcel.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parcel.parcelType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Requested': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Dispatched': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'In Transit': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Delivered': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleConfirmDelivery = async (parcelId: string) => {
    try {
      const result = await confirmParcel(parcelId).unwrap();
      if (result.success) {
        toast.success('Parcel delivery confirmed successfully!');
        refetch(); // Refresh the list
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to confirm delivery');
    }
  };

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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Parcels</h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  <Truck className="h-8 w-8 text-blue-600 mr-3" />
                  Incoming Parcels
                </h1>
                <p className="text-gray-600 mt-2">Manage packages being delivered to you</p>
              </div>
              <div className="text-sm text-gray-600">
                {filteredParcels.length} of {parcels.length} parcels
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by tracking ID, sender, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Parcels Grid */}
        {filteredParcels.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Incoming Parcels</h3>
            <p className="text-gray-600">
              {searchTerm ? 'No parcels match your search criteria' : 'You don\'t have any incoming parcels'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredParcels.map((parcel: Parcel) => (
              <div
                key={parcel._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{parcel.trackingId}</h3>
                      <p className="text-sm text-gray-600">{parcel.parcelType}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(parcel.currentStatus)}`}>
                      {parcel.currentStatus}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">From</p>
                      <p className="font-medium">{parcel.sender.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Weight</p>
                      <p className="font-medium">{parcel.weight} kg</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Est: {formatDate(parcel.estimatedDeliveryDate)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedParcel(parcel);
                        setShowDetails(true);
                      }}
                      className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Details
                    </button>
                    {(parcel.currentStatus === 'In Transit' || parcel.currentStatus === 'Dispatched') && (
                      <button
                        onClick={() => handleConfirmDelivery(parcel._id)}
                        className="flex-1 flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Confirm
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Parcel Details Modal */}
        {showDetails && selectedParcel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Parcel Details</h3>
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
                {/* Tracking Info */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Tracking Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tracking ID:</span>
                      <span className="font-medium">{selectedParcel.trackingId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedParcel.currentStatus)}`}>
                        {selectedParcel.currentStatus}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{selectedParcel.parcelType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight:</span>
                      <span className="font-medium">{selectedParcel.weight} kg</span>
                    </div>
                  </div>
                </div>

                {/* Sender Info */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Sender Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{selectedParcel.sender.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{selectedParcel.sender.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{selectedParcel.sender.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Delivery Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Recipient:</span>
                      <span className="font-medium">{selectedParcel.receiver.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{selectedParcel.receiver.phone}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Address:</span>
                      <p className="font-medium mt-1 text-sm">{selectedParcel.deliveryAddress}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    Close
                  </button>
                  {(selectedParcel.currentStatus === 'In Transit' || selectedParcel.currentStatus === 'Dispatched') && (
                    <button
                      onClick={() => {
                        handleConfirmDelivery(selectedParcel._id);
                        setShowDetails(false);
                      }}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                    >
                      Confirm Delivery
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewIncomingParcels;