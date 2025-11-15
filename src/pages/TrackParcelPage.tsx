// src/pages/TrackParcelPage.tsx
import { useTrackParcelQuery } from "@/redux/features/auth.api";
import React, { useState } from "react";
 

const TrackParcelPage = () => {
  const [trackingId, setTrackingId] = useState("");
  const [submittedId, setSubmittedId] = useState("");

  const { data, isLoading, isError, error } = useTrackParcelQuery(submittedId, {
    skip: !submittedId, // empty হলে API call করবে না
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim() !== "") {
      setSubmittedId(trackingId.trim());
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Track Parcel</h2>

      {/* Search Box */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="flex-1 border px-3 py-2 rounded"
        />
        <button className="bg-blue-600 text-white px-4 rounded">Track</button>
      </form>

      {/* Loading State */}
      {isLoading && (
        <p className="text-blue-500 mt-4 text-center">Loading...</p>
      )}

      {/* Error State */}
      {isError && (
        <p className="text-red-500 mt-4 text-center">
          {(error as any)?.data?.message || "Something went wrong"}
        </p>
      )}

      {/* Success State */}
      {data?.data && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">Parcel Details</h3>

          <p><strong>Tracking ID:</strong> {data.data.trackingId}</p>
          <p><strong>Status:</strong> {data.data.status}</p>
          <p><strong>Weight:</strong> {data.data.weight} kg</p>
          <p><strong>Cost:</strong> {data.data.price} ৳</p>

          <h4 className="text-lg font-semibold mt-4">Sender Info</h4>
          <p><strong>Name:</strong> {data.data.sender?.name}</p>
          <p><strong>Email:</strong> {data.data.sender?.email}</p>
          <p><strong>Phone:</strong> {data.data.sender?.phone}</p>

          <h4 className="text-lg font-semibold mt-4">Receiver Info</h4>
          <p><strong>Name:</strong> {data.data.receiver?.userId?.name}</p>
          <p><strong>Email:</strong> {data.data.receiver?.userId?.email}</p>
          <p><strong>Phone:</strong> {data.data.receiver?.userId?.phone}</p>

          <h4 className="text-lg font-semibold mt-4">Delivery Info</h4>
          <p><strong>From:</strong> {data.data.from}</p>
          <p><strong>To:</strong> {data.data.to}</p>
          <p><strong>Date:</strong> {data.data.createdAt?.slice(0, 10)}</p>
        </div>
      )}
    </div>
  );
};

export default TrackParcelPage;
