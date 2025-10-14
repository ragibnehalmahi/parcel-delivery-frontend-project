import React, { useState, useMemo } from "react";
 
import { Parcel } from "@/type/parcel.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
// import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Edit, Trash2, Eye, XCircle, Package } from "lucide-react";
import ParcelEditForm from "../Sender/ParcelEditForm";
import { useCancelParcelMutation, useDeleteParcelMutation, useGetMyParcelsQuery, useGetSingleParcelQuery } from "@/redux/features/parcels/parcel.api";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const getStatusColor = (status: string) => {
  const map: Record<string, string> = {
    Requested: "bg-blue-100 text-blue-700",
    Approved: "bg-green-100 text-green-700",
    Dispatched: "bg-yellow-100 text-yellow-700",
    "In Transit": "bg-purple-100 text-purple-700",
    Delivered: "bg-gray-200 text-gray-800",
    Cancelled: "bg-red-100 text-red-700",
  };
  return map[status] || "bg-gray-100 text-gray-600";
};

const ViewAllCreatedParcels: React.FC = () => {
  const [filter, setFilter] = useState("");
  
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);

const { data, isLoading, isError } = useGetMyParcelsQuery(undefined);

const { data: parcelData, isLoading: isLoadingSingle } = useGetSingleParcelQuery(
  selectedParcelId ?? "",
  { skip: !selectedParcelId }
);

  const [cancelParcel] = useCancelParcelMutation();
  const [deleteParcel, { isLoading: isDeleting }] = useDeleteParcelMutation();

  const parcels = useMemo(() => {
    const all = data?.data || [];
    return all.filter(
      (p: Parcel) =>
        p.trackingId.toLowerCase().includes(filter.toLowerCase()) ||
        p.receiver.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  const handleCancel = async (id: string) => {
    try {
      await cancelParcel(id).unwrap();
      toast.success("Parcel cancelled successfully!");
    } catch {
      toast.error("Failed to cancel parcel.");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteParcel(deleteId).unwrap();
      toast.success("Parcel deleted!");
    } catch {
      toast.error("Failed to delete parcel.");
    } finally {
      setDeleteId(null);
    }
  };

  const openEditDialog = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setIsEditOpen(true);
  };

  if (isLoading) return  
  if (isError)
    return (
      <div className="text-center text-red-500 mt-10">Failed to load parcels.</div>
    );
interface ParcelEditFormProps {
  parcel: Parcel;
  onEditSuccess: () => void;
}

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-orange-600">
          <Package className="w-6 h-6" /> My Parcels
        </h1>
        <Input
          placeholder="Search by name or tracking ID..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-72"
        />
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Receiver</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parcels.length > 0 ? (
              parcels.map((parcel) => (
                <TableRow key={parcel._id}>
                  <TableCell>{parcel.trackingId}</TableCell>
                  <TableCell>{parcel.receiver?.name}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(parcel.currentStatus)} px-2`}>
                      {parcel.currentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{parcel.parcelType}</TableCell>
                  <TableCell>{parcel.weight} kg</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setSelectedParcelId(parcel._id!)}
                    >
                      <Eye className="w-4 h-4 text-gray-700" />
                    </Button>
                    {(parcel.currentStatus === "Requested" ||
                      parcel.currentStatus === "Approved") && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleCancel(parcel._id!)}
                      >
                        <XCircle className="w-4 h-4 text-red-500" />
                      </Button>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openEditDialog(parcel)}
                    >
                      <Edit className="w-4 h-4 text-blue-600" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setDeleteId(parcel._id!)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No parcels found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Details Dialog */}
      <Dialog open={!!selectedParcelId} onOpenChange={() => setSelectedParcelId(null)}>
        <DialogContent className="max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle>Parcel Details</DialogTitle>
          </DialogHeader>
          {isLoadingSingle ? (
            <LoadingSkeleton/>
          ) : parcelData?.data ? (
            <div className="space-y-2">
              <p><strong>Tracking ID:</strong> {parcelData.data.trackingId}</p>
              <p><strong>Status:</strong> {parcelData.data.currentStatus}</p>
              <p><strong>Type:</strong> {parcelData.data.parcelType}</p>
              <p><strong>Weight:</strong> {parcelData.data.weight} kg</p>
              <p><strong>Receiver:</strong> {parcelData.data.receiver?.name}</p>
            </div>
          ) : (
            <p>No details found.</p>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
     <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
  <DialogContent className="max-w-2xl rounded-xl">
    <DialogHeader>
      <DialogTitle>Edit Parcel</DialogTitle>
    </DialogHeader>
    {selectedParcel ? (
      <ParcelEditForm
        parcel={selectedParcel}
        onEditSuccess={() => setIsEditOpen(false)}
      />
    ) : (
      <LoadingSkeleton />
    )}
  </DialogContent>
</Dialog>


      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Parcel?</AlertDialogTitle>
          </AlertDialogHeader>
          <p>This action cannot be undone.</p>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ViewAllCreatedParcels;
