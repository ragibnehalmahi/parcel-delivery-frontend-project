import React, { useState } from "react";
//import { useCancelParcelMutation } from "@/redux/features/auth/auth.api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import toast from "react-hot-toast";
import { XCircle, PackageX } from "lucide-react";
import { useCancelParcelMutation } from "@/redux/features/parcels/parcel.api";

const ParcelCancel: React.FC = () => {
  const [trackingId, setTrackingId] = useState("");
  const [reason, setReason] = useState("");
  const [cancelParcel, { isLoading }] = useCancelParcelMutation();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleCancel = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingId.trim()) {
      toast.error("Please enter a valid tracking ID!");
      return;
    }

    try {
      const response = await cancelParcel(trackingId).unwrap();
      setSuccessMsg(`✅ Parcel (${trackingId}) cancelled successfully!`);
      setErrorMsg(null);
      setTrackingId("");
      setReason("");
      toast.success(response?.message || "Parcel cancelled successfully!");
    } catch (err: any) {
      setErrorMsg("❌ Failed to cancel parcel. Please try again.");
      setSuccessMsg(null);
      toast.error(err?.data?.message || "Failed to cancel parcel.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 mt-10 border border-gray-100">
      <h2 className="text-2xl font-bold text-center text-orange-600 mb-6 flex justify-center items-center gap-2">
        <PackageX className="w-6 h-6 text-orange-500" />
        Cancel a Parcel
      </h2>

      <form onSubmit={handleCancel} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Tracking ID<span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="Enter your tracking ID..."
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Reason (optional)</label>
          <Input
            type="text"
            placeholder="Enter cancellation reason..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2"
        >
          <XCircle className="w-4 h-4" />
          {isLoading ? "Cancelling..." : "Cancel Parcel"}
        </Button>
      </form>

      {successMsg && (
        <Alert className="mt-4 border-green-300 bg-green-50 text-green-700">
          <AlertDescription>{successMsg}</AlertDescription>
        </Alert>
      )}

      {errorMsg && (
        <Alert className="mt-4 border-red-300 bg-red-50 text-red-700">
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ParcelCancel;
