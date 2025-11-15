// ViewDeliveryHistory.tsx - FIXED
import { useMemo, useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Inbox, Clock, Package, User } from "lucide-react";
import { useGetDeliveredParcelsQuery } from "@/redux/features/auth.api";
import { useUserInfoQuery } from "@/redux/features/auth.api";
import { type Parcel } from "@/type/parcel.type";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

const ViewDeliveryHistory = () => {
  const { data: userData } = useUserInfoQuery(undefined);
  const userRole = userData?.data?.role;
  
  // Role-based data fetching (same hook for both roles, assuming API handles filtering)
  const { data, isLoading, isError } = useGetDeliveredParcelsQuery(undefined);

  const [search, setSearch] = useState("");

  // Safe data extraction (adjusted to match API response structure; if nested, use data?.data?.data)
  const parcels = useMemo(() => {
    if (!data?.data) return [];
    return Array.isArray(data.data) ? data.data : [];
  }, [data]);

  const columns: ColumnDef<Parcel>[] = [
  { 
    accessorKey: "trackingId", 
    header: "Tracking ID",
    cell: ({ row }) => (
      <span className="font-mono font-semibold text-blue-600">
        {row.original.trackingId || "N/A"}
      </span>
    )
  },
  { 
    accessorKey: "parcelType", 
    header: "Type",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Package className="w-4 h-4 text-gray-500" />
        <span className="capitalize">{row.original.parcelType || "Unknown"}</span>
      </div>
    )
  },
  {
    accessorKey: "weight",
    header: "Weight (kg)",
    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.weight ? `${row.original.weight} kg` : "N/A"}
      </span>
    )
  },
  {
    accessorKey: "deliveryAddress",
    header: "Delivery Address",
    cell: ({ row }) => (
      <span 
        className="max-w-xs truncate block" 
        title={row.original.deliveryAddress || "No address provided"}
      >
        {row.original.deliveryAddress || "N/A"}
      </span>
    )
  },
  // Conditional column for admin only
  ...(userRole === 'admin' ? [{
    id: "receiverName",
    accessorKey: "receiver.name",
    header: "Receiver",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 min-w-[120px]">
        <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
        <span className="truncate">
          {row.original.receiver?.name || "Unknown Receiver"}
        </span>
      </div>
    )
  } as ColumnDef<Parcel>] : []),
  {
    accessorKey: "updatedAt",
    header: "Delivered On",
    cell: ({ row }) => {
      const date = row.original.updatedAt || row.original.createdAt;
      return date ? (
        <div className="flex flex-col">
          <span className="font-medium">
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(date).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      ) : (
        <span className="text-gray-400">N/A</span>
      );
    },
  },
  {
    accessorKey: "currentStatus",
    header: "Status",
    cell: ({ row }) => (
      <Badge 
        className="bg-green-100 text-green-700 font-medium border border-green-200 px-2 py-1"
      >
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          {row.original.currentStatus || "Unknown"}
        </div>
      </Badge>
    ),
  },
];

  const table = useReactTable({
    data: parcels,
    columns,
    state: { globalFilter: search },
    onGlobalFilterChange: setSearch,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <LoadingSkeleton />;
  
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <Inbox className="w-12 h-12 text-red-500" />
        <p className="text-red-600 font-medium">Failed to load delivery history.</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <Card className="p-6 shadow-lg border-0 rounded-2xl bg-gradient-to-br from-white to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <Clock className="w-6 h-6 text-blue-600" />
          Delivery History
          <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">
            {userRole === 'admin' ? 'All Deliveries' : 'My Deliveries'}
          </Badge>
        </CardTitle>
        <CardDescription className="text-gray-600">
          {userRole === 'admin' 
            ? 'View all delivered parcels across the platform' 
            : 'View your successfully delivered parcels history'
          }
        </CardDescription>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Input
            placeholder="Search by tracking ID, type, or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Inbox className="w-4 h-4" />
            Total: {parcels.length} delivered parcels
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white min-h-[400px]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((group) => (
                <TableRow key={group.id} className="bg-gray-50">
                  {group.headers.map((header) => (
                    <TableHead key={header.id} className="font-semibold text-gray-700">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow 
                    key={row.id} 
                    className="hover:bg-blue-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-12">
                    <div className="flex flex-col items-center gap-3 text-gray-400">
                      <Inbox className="w-16 h-16" />
                      <p className="text-lg font-medium">No delivered parcels found</p>
                      <p className="text-sm">
                        {search ? 'Try adjusting your search terms' : 'All your deliveries will appear here once completed'}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {table.getPageCount() > 1 && (
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-600">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className="flex gap-2">
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
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ViewDeliveryHistory;
