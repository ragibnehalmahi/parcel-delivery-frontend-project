import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import {
  useGetMyParcelsQuery,
  useDeleteParcelMutation,
  useCancelParcelMutation,
  useUpdateParcelMutation,
} from "@/redux/features/auth.api"; // ✅ Corrected import
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Inbox } from "lucide-react";
import toast from "react-hot-toast";

interface Parcel {
  _id: string;
  trackingId: string;
  parcelType: string;
  weight: number;
  currentStatus: string;
  sender: { name: string; email: string };
  receiver: { name: string; email: string; phone: string };
  deliveryAddress: string;
}

const ViewCreatedParcelsAll: React.FC = () => {
  const { data, isLoading, isError, refetch } = useGetMyParcelsQuery({});
  const [deleteParcel] = useDeleteParcelMutation();
  const [cancelParcel] = useCancelParcelMutation();
  const [updateParcel] = useUpdateParcelMutation();

  const [globalFilter, setGlobalFilter] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [formData, setFormData] = useState({
    parcelType: "",
    weight: "",
    deliveryAddress: "",
  });

  const parcels = useMemo(() => data?.data || [], [data]);

  // 🟢 Badge Color Logic
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Requested":
        return "bg-blue-100 text-blue-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Dispatched":
      case "In Transit":
      case "Picked":
        return "bg-yellow-100 text-yellow-800";
      case "Delivered":
        return "bg-gray-200 text-gray-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // 🟢 Table Columns
  const columns: ColumnDef<Parcel>[] = [
    { accessorKey: "trackingId", header: "Tracking ID" },
    { accessorKey: "parcelType", header: "Type" },
    { accessorKey: "weight", header: "Weight (kg)" },
    {
      accessorKey: "currentStatus",
      header: "Status",
      cell: ({ getValue }) => (
        <Badge className={getStatusBadgeVariant(getValue() as string)}>
          {getValue() as string}
        </Badge>
      ),
    },
    { accessorKey: "receiver.name", header: "Receiver Name" },
    { accessorKey: "deliveryAddress", header: "Delivery Address" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const parcel = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                ⋮
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* View Parcel */}
              <DropdownMenuItem onClick={() => handleView(parcel)}>
                👁️ View
              </DropdownMenuItem>

              {/* Edit Parcel */}
              {(parcel.currentStatus === "Requested" ||
                parcel.currentStatus === "Cancelled") && (
                <DropdownMenuItem onClick={() => handleEditClick(parcel)}>
                  ✏️ Edit
                </DropdownMenuItem>
              )}

              {/* Cancel Parcel */}
              {parcel.currentStatus === "Requested" && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      ❌ Cancel
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel this Parcel?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Once cancelled, this action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Back</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleCancel(parcel._id)}>
                        Confirm Cancel
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              {/* Delete Parcel */}
              {(parcel.currentStatus === "Requested" ||
                parcel.currentStatus === "Cancelled") && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      🗑️ Delete
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this Parcel?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This cannot be undone permanently.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(parcel._id)}>
                        Confirm Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // 🟢 Table Config
  const table = useReactTable({
    data: parcels,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });

  // 🟢 Handlers
  const handleEditClick = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setFormData({
      parcelType: parcel.parcelType,
      weight: parcel.weight.toString(),
      deliveryAddress: parcel.deliveryAddress,
    });
    setEditModalOpen(true);
  };

  const handleView = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setViewModalOpen(true);
  };

 const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!selectedParcel?._id) return toast.error("Invalid parcel!");

  try {
    await updateParcel({
      parcelId: selectedParcel._id, // ✅ আগের 'id' এখন parcelId
      data: {
        parcelType: formData.parcelType,
        weight: Number(formData.weight),
        deliveryAddress: formData.deliveryAddress,
      },
    }).unwrap();

    toast.success("Parcel updated successfully!");
    setEditModalOpen(false);
    refetch();
  } catch (error: any) {
    toast.error(error?.data?.message || "Failed to update parcel");
  }
};


  const handleCancel = async (parcelId: string) => {
    try {
      await cancelParcel(parcelId).unwrap();
      toast.success("Parcel cancelled successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to cancel parcel");
    }
  };

  const handleDelete = async (parcelId: string) => {
    try {
      await deleteParcel(parcelId).unwrap();
      toast.success("Parcel deleted successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete parcel");
    }
  };

  if (isLoading) return <LoadingSkeleton />;
  if (isError)
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Inbox className="h-12 w-12 text-gray-400" />
        <p className="text-gray-500 mt-2">Error loading parcels.</p>
      </div>
    );

  // 🟢 Render
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-orange-600">📦 My Parcels</h1>
        <p className="text-sm text-gray-600">
          Manage, view, or update your parcels easily.
        </p>
      </div>

      <Input
        placeholder="Search parcels..."
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm mb-4"
      />

      <div className="rounded-md border overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2 text-left">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-8">
                  No parcels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      {/* 🧩 Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Parcel</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-3 mt-2">
            <div>
              <Label>Parcel Type</Label>
              <Input
                name="parcelType"
                value={formData.parcelType}
                onChange={(e) => setFormData({ ...formData, parcelType: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Weight (kg)</Label>
              <Input
                name="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Delivery Address</Label>
              <Input
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={(e) =>
                  setFormData({ ...formData, deliveryAddress: e.target.value })
                }
                required
              />
            </div>
            <div className="flex justify-end pt-3">
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Update Parcel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* 🧩 View Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Parcel Details</DialogTitle>
            <DialogDescription>Full parcel information below.</DialogDescription>
          </DialogHeader>
          {selectedParcel && (
            <div className="space-y-2 mt-2 text-sm">
              <p><b>Tracking ID:</b> {selectedParcel.trackingId}</p>
              <p><b>Type:</b> {selectedParcel.parcelType}</p>
              <p><b>Weight:</b> {selectedParcel.weight} kg</p>
              <p><b>Status:</b> {selectedParcel.currentStatus}</p>
              <p><b>Receiver:</b> {selectedParcel.receiver.name}</p>
              <p><b>Email:</b> {selectedParcel.receiver.email}</p>
              <p><b>Phone:</b> {selectedParcel.receiver.phone}</p>
              <p><b>Address:</b> {selectedParcel.deliveryAddress}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ViewCreatedParcelsAll;


// import React, { useState, useMemo } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getFilteredRowModel,
//   type ColumnDef,
//   flexRender,
// } from "@tanstack/react-table";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { LoadingSkeleton } from "@/components/LoadingSkeleton";
// import { Inbox } from "lucide-react";
// import { ParcelEditForm } from "./ParcelEditeForm";
// import {
//   useGetMyParcelsQuery,
//   useDeleteParcelMutation,
//   useGetSingleParcelQuery,
//   useCancelParcelMutation,
// } from "@/redux/features/auth.api";
// import toast from "react-hot-toast";

// interface Parcel {
//   _id: string;
//   trackingId: string;
//   parcelType: string;
//   weight: number;
//   currentStatus: string;
//   sender: { name: string; email: string };
//   receiver: { name: string; email: string; phone: string };
//   deliveryAddress: string;
//   isBlocked: boolean;
// }

// const ViewCreatedParcelsAll: React.FC = () => {
//   const { data, isLoading, isError } = useGetMyParcelsQuery({});
//   const [deleteParcel] = useDeleteParcelMutation();
//   const [cancelParcel] = useCancelParcelMutation();
//   const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [globalFilter, setGlobalFilter] = useState("");

//   const parcels = useMemo(() => data?.data || [], [data]);

//   const { data: singleParcel } = useGetSingleParcelQuery(selectedParcelId!, {
//     skip: !selectedParcelId,
//   });

//   // 🟢 Status badge color logic
//   const getStatusBadgeVariant = (status: string) => {
//     switch (status) {
//       case "Requested":
//         return "bg-blue-100 text-blue-800";
//       case "Approved":
//         return "bg-green-100 text-green-800";
//       case "Dispatched":
//       case "In Transit":
//       case "Picked":
//         return "bg-yellow-100 text-yellow-800";
//       case "Delivered":
//         return "bg-gray-100 text-gray-800";
//       case "Cancelled":
//       case "Returned":
//       case "Held":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   // 🟢 Table columns
//   const columns: ColumnDef<Parcel>[] = [
//     { accessorKey: "trackingId", header: "Tracking ID" },
//     { accessorKey: "parcelType", header: "Type" },
//     { accessorKey: "weight", header: "Weight" },
//     {
//       accessorKey: "currentStatus",
//       header: "Status",
//       cell: ({ getValue }) => (
//         <Badge className={getStatusBadgeVariant(getValue() as string)}>
//           {getValue() as string}
//         </Badge>
//       ),
//     },
//     { accessorKey: "sender.name", header: "Sender Name" },
//     { accessorKey: "receiver.name", header: "Receiver Name" },
//     { accessorKey: "receiver.email", header: "Receiver Email" },
//     { accessorKey: "receiver.phone", header: "Receiver Phone" },
//     { accessorKey: "deliveryAddress", header: "Delivery Address" },
//     {
//       id: "actions",
//       header: "Actions",
//       cell: ({ row }) => {
//         const parcel = row.original;

//         return (
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="h-8 w-8 p-0">
//                 ⋮
//               </Button>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent align="end">
//               <DropdownMenuItem onClick={() => setSelectedParcelId(parcel._id)}>
//                 View Details
//               </DropdownMenuItem>

//               {/* 🟠 Cancel Button (only if Requested) */}
//               {parcel.currentStatus === "Requested" && (
//                 <AlertDialog>
//                   <AlertDialogTrigger asChild>
//                     <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
//                       Cancel Parcel
//                     </DropdownMenuItem>
//                   </AlertDialogTrigger>
//                   <AlertDialogContent>
//                     <AlertDialogHeader>
//                       <AlertDialogTitle>Cancel this Parcel?</AlertDialogTitle>
//                       <AlertDialogDescription>
//                         Once cancelled, it cannot be reversed.
//                       </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                       <AlertDialogCancel>Back</AlertDialogCancel>
//                       <AlertDialogAction
//                         onClick={() => handleCancel(parcel._id)}
//                       >
//                         Confirm Cancel
//                       </AlertDialogAction>
//                     </AlertDialogFooter>
//                   </AlertDialogContent>
//                 </AlertDialog>
//               )}

//               {/* 🟠 Edit Option */}
//               {(parcel.currentStatus === "Requested" ||
//                 parcel.currentStatus === "Cancelled") && (
//                 <DropdownMenuItem
//                   onClick={() => {
//                     setSelectedParcelId(parcel._id);
//                     setEditDialogOpen(true);
//                   }}
//                 >
//                   Edit Parcel
//                 </DropdownMenuItem>
//               )}

//               {/* 🟠 Delete Option */}
//               {(parcel.currentStatus === "Requested" ||
//                 parcel.currentStatus === "Cancelled") && (
//                 <AlertDialog>
//                   <AlertDialogTrigger asChild>
//                     <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
//                       Delete
//                     </DropdownMenuItem>
//                   </AlertDialogTrigger>
//                   <AlertDialogContent>
//                     <AlertDialogHeader>
//                       <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//                       <AlertDialogDescription>
//                         This will permanently delete the parcel.
//                       </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                       <AlertDialogCancel>Cancel</AlertDialogCancel>
//                       <AlertDialogAction
//                         onClick={() => handleDelete(parcel._id)}
//                       >
//                         Delete
//                       </AlertDialogAction>
//                     </AlertDialogFooter>
//                   </AlertDialogContent>
//                 </AlertDialog>
//               )}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         );
//       },
//     },
//   ];

//   const table = useReactTable({
//     data: parcels,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     state: { globalFilter },
//     onGlobalFilterChange: setGlobalFilter,
//   });

//   // 🟢 Cancel Parcel Handler
//   const handleCancel = async (parcelId: string) => {
//     try {
//       const res = await cancelParcel(parcelId).unwrap();
//       toast.success("Parcel cancelled successfully!");
//       console.log(res);
//     } catch (error: any) {
//       toast.error(error?.data?.message || "Failed to cancel parcel");
//       console.error(error);
//     }
//   };

//   // 🟢 Delete Parcel Handler
//   const handleDelete = async (parcelId: string) => {
//     try {
//       await deleteParcel(parcelId).unwrap();
//       toast.success("Parcel deleted successfully!");
//     } catch (error) {
//       toast.error("Failed to delete parcel");
//       console.error(error);
//     }
//   };

//   if (isLoading) return <LoadingSkeleton />;

//   if (isError)
//     return (
//       <div className="flex flex-col items-center justify-center h-64">
//         <Inbox className="h-12 w-12 text-gray-400" />
//         <p className="text-gray-500 mt-2">Error loading parcels.</p>
//       </div>
//     );

//   return (
//     <Card className="p-6">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-bold text-orange-600">All Parcels</h1>
//         <p className="text-sm text-gray-600">Manage your created parcels</p>
//       </div>

//       <div className="flex items-center space-x-2 mb-4">
//         <Input
//           placeholder="Search parcels..."
//           value={globalFilter ?? ""}
//           onChange={(event) => setGlobalFilter(event.target.value)}
//           className="max-w-sm"
//         />
//       </div>

//       <div className="rounded-md border overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th key={header.id} className="px-4 py-2 text-left">
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {table.getRowModel().rows.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <tr key={row.id} className="border-t">
//                   {row.getVisibleCells().map((cell) => (
//                     <td key={cell.id} className="px-4 py-2">
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={columns.length} className="text-center py-8">
//                   No results found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-end gap-2 py-4">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           Previous
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           Next
//         </Button>
//       </div>

//       {/* 🟢 Parcel Details Dialog */}
//       <Dialog
//         open={!!selectedParcelId && !editDialogOpen}
//         onOpenChange={() => setSelectedParcelId(null)}
//       >
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Parcel Details</DialogTitle>
//           </DialogHeader>
//           {singleParcel && (
//             <div className="space-y-2">
//               <p>
//                 <strong>Tracking ID:</strong> {singleParcel.trackingId}
//               </p>
//               <p>
//                 <strong>Type:</strong> {singleParcel.parcelType}
//               </p>
//               <p>
//                 <strong>Status:</strong> {singleParcel.currentStatus}
//               </p>
//               <p>
//                 <strong>Sender:</strong> {singleParcel.sender.name}
//               </p>
//               <p>
//                 <strong>Receiver:</strong> {singleParcel.receiver.name}
//               </p>
//               <p>
//                 <strong>Address:</strong> {singleParcel.deliveryAddress}
//               </p>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* 🟢 Edit Parcel Dialog */}
//       <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Parcel</DialogTitle>
//           </DialogHeader>
//           {selectedParcelId && singleParcel && (
//             <ParcelEditForm
//               parcel={singleParcel}
//               onEditSuccess={() => setEditDialogOpen(false)}
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//     </Card>
//   );
// };

// export default ViewCreatedParcelsAll;

 