// ViewIncomingParcels.tsx - FIXED
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Inbox } from "lucide-react";
import toast from "react-hot-toast";
import {
  useGetIncomingParcelsQuery,
  useConfirmParcelMutation,
} from "@/redux/features/auth.api";
import { type Parcel } from "@/type/parcel.type";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Requested":
      return "bg-blue-100 text-blue-700";
    case "Dispatched":
      return "bg-yellow-100 text-yellow-700";
    case "Delivered":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const ViewIncomingParcels = () => {
  const { data, isLoading, isError } = useGetIncomingParcelsQuery({});
  const [confirmParcel] = useConfirmParcelMutation();
  const [filter, setFilter] = useState("");

  // ✅ FIXED: Correct data extraction (backend response is { success, data: parcelsArray })
  const parcels = useMemo(() => data?.data || [], [data]);

  const handleConfirm = async (parcelId: string) => {
    try {
      await confirmParcel(parcelId).unwrap();
      toast.success("Parcel confirmed successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to confirm parcel.");
    }
  };

  const columns: ColumnDef<Parcel>[] = [
    { accessorKey: "trackingId", header: "Tracking ID" },
    { accessorKey: "parcelType", header: "Type" },
    {
      accessorKey: "currentStatus",
      header: "Status",
      cell: ({ row }) => (
        <Badge className={`${getStatusBadge(row.original.currentStatus)} font-medium`}>
          {row.original.currentStatus}
        </Badge>
      ),
    },
    {
      accessorKey: "sender.name",
      header: "Sender",
      cell: ({ row }) => {
        const sender = row.original.sender;
        return typeof sender === "object" && sender !== null
          ? sender.name
          : "N/A";
      },
    },
    {
      accessorKey: "deliveryAddress",
      header: "Address",
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const parcel = row.original;
        return (
          <Button
            variant="default"
            size="sm"
            onClick={() => handleConfirm(parcel._id)}
            disabled={parcel.currentStatus === "Delivered"}
          >
            Confirm
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: parcels,
    columns,
    state: { globalFilter: filter },
    onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <LoadingSkeleton />;
  if (isError)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <Inbox className="w-12 h-12 text-red-500" />
        <p className="text-red-600 font-medium">Failed to load incoming parcels.</p>
      </div>
    );

  return (
    <Card className="p-6 shadow-md rounded-2xl bg-white dark:bg-gray-950">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-orange-700">
          <Package className="w-5 h-5 text-orange-500" />
          Incoming Parcels
        </CardTitle>
        <CardDescription>Review and confirm your received parcels.</CardDescription>
        <Input
          placeholder="Search parcels..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-xs mt-4"
        />
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto border rounded-lg bg-white dark:bg-gray-900 min-h-[400px]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((group) => (
                <TableRow key={group.id}>
                  {group.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-8 text-gray-500">
                    No incoming parcels.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end items-center gap-2 mt-4">
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
      </CardContent>
    </Card>
  );
};

export default ViewIncomingParcels;
