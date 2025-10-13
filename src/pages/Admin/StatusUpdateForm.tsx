import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateParcelStatusMutation } from '@/redux/features/parcels/parcel.api';
import { MapPin, MessageSquare, Package } from 'lucide-react';
import toast from 'react-hot-toast';

interface Parcel {
  _id: string;
  trackingId: string;
  currentStatus: string;
}

interface StatusUpdateFormProps {
  parcel: Parcel;
  onSuccess: () => void;
  onCancel: () => void;
}

// Available parcel status options
const STATUS_OPTIONS = [
  { value: 'REQUESTED', label: 'Requested' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'DISPATCHED', label: 'Dispatched' },
  { value: 'IN_TRANSIT', label: 'In Transit' },
  { value: 'PICKED', label: 'Picked' },
  { value: 'HELD', label: 'Held' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'RETURNED', label: 'Returned' },
  { value: 'CANCELLED', label: 'Cancelled' },
] as const;

// Form validation schema
const statusUpdateSchema = z.object({
  status: z.string().min(1, 'Please select a status'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  note: z.string().optional(),
});

type FormData = z.infer<typeof statusUpdateSchema>;

const StatusUpdateForm: React.FC<StatusUpdateFormProps> = ({ 
  parcel, 
  onSuccess, 
  onCancel 
}) => {
  const [updateStatus, { isLoading }] = useUpdateParcelStatusMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(statusUpdateSchema),
    defaultValues: {
      status: parcel.currentStatus,
      location: '',
      note: ''
    }
  });

  const selectedStatus = watch('status');

  const onSubmit = async (data: FormData) => {
    try {
      const result = await updateStatus({
        parcelId: parcel._id,
        status: data.status,
        location: data.location,
        note: data.note
      }).unwrap();

      if (result.success) {
        toast.success(`Parcel ${parcel.trackingId} status updated to ${data.status}`);
        reset();
        onSuccess();
      }
    } catch (error: any) {
      console.error('Status update error:', error);
      toast.error(error?.data?.message || 'Failed to update parcel status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED': return 'text-green-600 bg-green-50 border-green-200';
      case 'CANCELLED': return 'text-red-600 bg-red-50 border-red-200';
      case 'IN_TRANSIT': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'APPROVED': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Package className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Update Parcel Status</h3>
            <p className="text-sm text-gray-600">Tracking ID: {parcel.trackingId}</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Current status: <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(parcel.currentStatus)}`}>
            {parcel.currentStatus}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Status Field */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            New Status
          </label>
          <select
            id="status"
            {...register('status')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a status</option>
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>

        {/* Location Field */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
              Current Location
            </div>
          </label>
          <input
            type="text"
            id="location"
            placeholder="Enter current location (e.g., Dhaka Hub, Chittagong Warehouse)"
            {...register('location')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>

        {/* Note Field */}
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
              Additional Notes (Optional)
            </div>
          </label>
          <textarea
            id="note"
            rows={3}
            placeholder="Add any additional information about this status update..."
            {...register('note')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
          {errors.note && (
            <p className="mt-1 text-sm text-red-600">{errors.note.message}</p>
          )}
        </div>

        {/* Preview */}
        {selectedStatus && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Update Preview</h4>
            <p className="text-sm text-blue-700">
              Status will be changed to: <strong>{selectedStatus}</strong>
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Updating...
              </>
            ) : (
              'Update Status'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StatusUpdateForm;
