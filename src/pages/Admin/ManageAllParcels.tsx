import { useMemo, useState } from "react";
import {
  useAllparcelsQuery,
  useUpdateParcelStatusMutation,
  useBlockParcelMutation,
  useUnblockParcelMutation,
} from "@/redux/features/auth.api";

import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  MoreHorizontal,
  Package,
  CheckCircle,
  XCircle,
  Truck,
  Lock,
  Unlock,
} from "lucide-react";

import toast from "react-hot-toast";

// ---------------------------
// Utility
// ---------------------------
const getStatusColor = (status: string) => {
  switch (status) {
    case "Requested":
      return "bg-yellow-100 text-yellow-700";
    case "Dispatched":
      return "bg-blue-100 text-blue-700";
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

// ---------------------------
// Component
// ---------------------------
const ManageAllParcels = () => {
  const { data, isLoading, isError, refetch } = useAllparcelsQuery({});
  const [updateStatus] = useUpdateParcelStatusMutation();
  const [blockParcel] = useBlockParcelMutation();
  const [unblockParcel] = useUnblockParcelMutation();

  const [globalFilter, setGlobalFilter] = useState("");

  const parcels = data?.data ?? [];

  // ---------------------------
  // Handlers
  // ---------------------------
  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await updateStatus({ id, status }).unwrap();
      toast.success(res?.message || "Parcel status updated!");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  const handleBlock = async (id: string) => {
    try {
      await blockParcel(id).unwrap();
      toast.success("Parcel blocked successfully!");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to block parcel");
    }
  };

  const handleUnblock = async (id: string) => {
    try {
      await unblockParcel(id).unwrap();
      toast.success("Parcel unblocked successfully!");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to unblock parcel");
    }
  };

  // ---------------------------
  // Table Columns
  // ---------------------------
  const columns = useMemo<ColumnDef<any>[]>(() => [
    {
      accessorKey: "trackingId",
      header: "Tracking ID",
      cell: ({ row }) => (
        <span className="font-semibold text-gray-800 dark:text-gray-200">
          {row.original.trackingId}
        </span>
      ),
    },

    {
      accessorKey: "sender",
      header: "Sender",
      cell: ({ row }) =>
        row.original.sender?.name ||
        row.original.sender?.email ||
        "N/A",
    },

    {
      accessorKey: "receiver",
      header: "Receiver",
      cell: ({ row }) =>
        row.original.receiver?.name || "N/A",
    },

    {
      accessorKey: "weight",
      header: "Weight (kg)",
      cell: ({ row }) => row.original.weight?.toFixed(2) || "0.00",
    },

    // ---------------------------
    // ✔ FIXED: Show actual parcelFee
    // ---------------------------
    {
      accessorKey: "parcelFee",
      header: "Price (৳)",
      cell: ({ row }) => {
        const fee = row.original.parcelFee;
        return fee ? fee.toFixed(2) : "0.00";
      },
    },

    {
      accessorKey: "currentStatus",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          className={`px-2 py-1 text-sm ${getStatusColor(
            row.original.currentStatus
          )}`}
        >
          {row.original.currentStatus}
        </Badge>
      ),
    },

    {
      accessorKey: "isBlocked",
      header: "Blocked?",
      cell: ({ row }) =>
        row.original.isBlocked ? (
          <Badge className="bg-red-200 text-red-700">Blocked</Badge>
        ) : (
          <Badge className="bg-green-200 text-green-700">Active</Badge>
        ),
    },

    // ---------------------------
    // Actions
    // ---------------------------
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const parcel = row.original;
        const parcelId = parcel._id ?? parcel.id;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Manage Parcel</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Status Actions */}
              <DropdownMenuItem
                onClick={() => handleStatusChange(parcelId, "Dispatched")}
              >
                <Truck className="w-4 h-4 mr-2 text-blue-500" />
                Mark as Dispatched
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleStatusChange(parcelId, "Delivered")}
              >
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Mark as Delivered
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleStatusChange(parcelId, "Cancelled")}
              >
                <XCircle className="w-4 h-4 mr-2 text-red-500" />
                Cancel Parcel
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Block / Unblock */}
              {parcel.isBlocked ? (
                <DropdownMenuItem onClick={() => handleUnblock(parcelId)}>
                  <Unlock className="w-4 h-4 mr-2 text-green-600" />
                  Unblock Parcel
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => handleBlock(parcelId)}>
                  <Lock className="w-4 h-4 mr-2 text-red-600" />
                  Block Parcel
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ], []);

  // ---------------------------
  // Table setup
  // ---------------------------
  const table = useReactTable({
    data: parcels,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // ---------------------------
  // Loading/error UI
  // ---------------------------
  if (isLoading)
    return <p className="text-center py-10 text-gray-500">Loading parcels...</p>;

  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load parcels. Try again later.
      </p>
    );

  // ---------------------------
  // Render
  // ---------------------------
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Package className="text-orange-500 w-6 h-6" />
          Manage All Parcels
        </h1>

        <Input
          placeholder="Search parcels..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <div className="overflow-x-auto border rounded-xl shadow-sm bg-white dark:bg-gray-950">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-sm font-semibold">
                    {header.column.columnDef.header as string}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-orange-50/50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 whitespace-nowrap">
                      {cell.column.columnDef.cell
                        ? (cell.column.columnDef.cell as any)({ row })
                        : cell.getValue()}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-8"
                >
                  No parcels found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ManageAllParcels;
