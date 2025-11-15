// ConfirmParcelDelivery.tsx
import { useMemo, useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronDown, MoreHorizontal, PackageSearch, Inbox } from "lucide-react";
import toast from "react-hot-toast";
import {
  useConfirmParcelMutation,
  useGetIncomingParcelsQuery,
  useGetSingleParcelQuery,
} from "@/redux/features/auth.api";
import { type Parcel } from "@/type/parcel.type";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "Requested":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200";
    case "Approved":
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200";
    case "Dispatched":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200";
    case "Delivered":
      return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
  }
};

const ConfirmParcelDelivery = () => {
  const { data: parcelResponse, isLoading, isError } = useGetIncomingParcelsQuery({});
  const [confirmParcel] = useConfirmParcelMutation();

  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { data: singleParcelData, isLoading: parcelDetailsLoading } = useGetSingleParcelQuery(selectedParcelId, {
    skip: !selectedParcelId,
  });

  const handleConfirm = async (parcelId: string) => {
    try {
      await confirmParcel(parcelId).unwrap();
      toast.success("✅ Parcel confirmed successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "❌ Failed to confirm parcel.");
    }
  };

  const parcels = useMemo(() => parcelResponse?.data?.data || [], [parcelResponse]);

  const columns: ColumnDef<Parcel>[] = [
    { accessorKey: "trackingId", header: "Tracking ID" },
    { accessorKey: "parcelType", header: "Parcel Type" },
    {
      accessorKey: "sender.name",
      header: "Sender",
      cell: ({ row }) => {
        const sender = row.original.sender;
        return typeof sender === "object" && sender !== null ? sender.name : "N/A";
      },
    },
    {
      accessorKey: "receiver.name",
      header: "Receiver",
      cell: ({ row }) => {
        const receiver = row.original.receiver;
        return typeof receiver === "object" && receiver !== null ? receiver.name : "N/A";
      },
    },
    {
      accessorKey: "currentStatus",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.currentStatus;
        return (
          <Badge className={`${getStatusBadgeColor(status)} font-semibold`}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "weight",
      header: "Weight (kg)",
    },
    {
      accessorKey: "deliveryAddress",
      header: "Delivery Address",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const parcel = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedParcelId(parcel._id);
                  setIsDetailsOpen(true);
                }}
              >
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleConfirm(parcel._id)}>
                Confirm Parcel
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: parcels,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: { pageSize: 6 },
    },
  });

  if (isLoading) return <LoadingSkeleton />;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] gap-4 text-center">
        <Inbox className="w-16 h-16 text-red-500" />
        <h2 className="text-xl font-semibold text-red-600">Error loading parcels</h2>
        <p className="text-gray-500 dark:text-gray-400">Please try again later.</p>
      </div>
    );
  }

  const selectedParcel = singleParcelData?.data;

  return (
    <Card className="p-6 shadow-lg bg-white/90 dark:bg-gray-950/90 border-0 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-extrabold text-orange-700 flex items-center gap-2">
          <PackageSearch className="w-6 h-6 text-orange-500" />
          Confirm Parcel Delivery
        </CardTitle>
        <CardDescription>Review and confirm all incoming parcels.</CardDescription>
        <div className="flex items-center justify-between gap-4 py-4">
          <Input
            placeholder="Search parcels..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((col) => col.getCanHide())
                .map((col) => (
                  <DropdownMenuCheckboxItem
                    key={col.id}
                    checked={col.getIsVisible()}
                    onCheckedChange={(value) => col.toggleVisibility(!!value)}
                    className="capitalize"
                  >
                    {col.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border bg-white dark:bg-gray-950 overflow-x-auto min-h-[450px]">
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
                  <TableRow key={row.id} className="hover:bg-orange-50/50">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-10">
                    <Inbox className="w-12 h-12 text-gray-400 mx-auto" />
                    <p className="text-gray-500 mt-2">No parcels found.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Next
          </Button>
        </div>
      </CardContent>

      {/* Modal for Parcel Details */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[420px] rounded-2xl bg-white dark:bg-gray-950">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-orange-600 font-bold">
              <PackageSearch className="w-5 h-5 text-orange-500" />
              Parcel Details
            </DialogTitle>
          </DialogHeader>

          {parcelDetailsLoading ? (
            <LoadingSkeleton />
          ) : selectedParcel ? (
            <div className="space-y-3 mt-2 text-gray-700 dark:text-gray-300">
              <p><strong>Tracking ID:</strong> {selectedParcel.trackingId}</p>
              <p><strong>Status:</strong> {selectedParcel.currentStatus}</p>
              <p><strong>Type:</strong> {selectedParcel.parcelType}</p>
              <p><strong>Weight:</strong> {selectedParcel.weight} kg</p>
              <p><strong>Address:</strong> {selectedParcel.deliveryAddress}</p>
              <hr />
              <h4 className="font-semibold text-orange-700 mt-3">Sender</h4>
              <p>{selectedParcel.sender?.name}</p>
              <p>{selectedParcel.sender?.email}</p>
              <hr />
              <h4 className="font-semibold text-orange-700 mt-3">Receiver</h4>
              <p>{selectedParcel.receiver?.name}</p>
              <p>{selectedParcel.receiver?.email}</p>
              <p>{selectedParcel.receiver?.phone}</p>
            </div>
          ) : (
            <div className="text-center text-gray-500">No details found.</div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ConfirmParcelDelivery;
