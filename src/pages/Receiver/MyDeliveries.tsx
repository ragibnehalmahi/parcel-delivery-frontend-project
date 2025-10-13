import * as React from "react";
import {
  ColumnDef,
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { useGetMyDeliveriesQuery, useGetParcelDetailsQuery } from "@/redux/features/parcel/parcel.api"; // Replace with your actual hooks
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, ChevronDown, Truck, CheckCircle } from "lucide-react";
import { ParcelType } from "@/types/parcel"; // Assume your Parcel type
import { format } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/LoadingSpinner"; // Assume a simple spinner component
import toast from "react-hot-toast";
import { useGetDeliveredParcelsQuery } from "@/redux/features/parcels/parcel.api";

// Shared status variant function (extract to utils if needed)
const getStatusVariant = (status: string) => {
  switch (status) {
    case "Delivered":
      return { bg: "bg-emerald-100 dark:bg-emerald-900", text: "text-emerald-700 dark:text-emerald-200" };
    case "In Transit":
      return { bg: "bg-amber-100 dark:bg-amber-900", text: "text-amber-700 dark:text-amber-200" };
    case "Picked Up":
      return { bg: "bg-blue-100 dark:bg-blue-900", text: "text-blue-700 dark:text-blue-200" };
    case "Completed":
      return { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-700 dark:text-gray-300" };
    case "Failed":
    case "Returned":
      return { bg: "bg-red-100 dark:bg-red-900", text: "text-red-700 dark:text-red-200" };
    default:
      return { bg: "bg-slate-100 dark:bg-slate-800", text: "text-slate-600 dark:text-slate-400" };
  }
};

const MyDeliveries = () => {
  const { data: deliveries, isLoading: loading, isError: error } = useGetDeliveredParcelsQuery(); // Fetches user's completed deliveries
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showDetails, setShowDetails] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const { data: parcelDetails, isLoading: detailsLoading } = useGetDeliveredParcelsQuery(selectedId, {
    skip: !selectedId,
  });

  const data = React.useMemo(() => deliveries?.items || [], [deliveries]);
  const columns: ColumnDef<ParcelType>[] = [
    { accessorKey: "id", header: "Parcel ID" },
    { accessorKey: "category", header: "Category" },
    {
      accessorKey: "from.name",
      header: "From Name",
      cell: ({ row }) => row.original.from?.name || "N/A",
    },
    {
      accessorKey: "from.contact",
      header: "From Contact",
      cell: ({ row }) => row.original.from?.contact || "N/A",
    },
    {
      accessorKey: "to.name",
      header: "To Name",
      cell: ({ row }) => row.original.to?.name || "N/A",
    },
    {
      accessorKey: "to.contact",
      header: "To Contact",
      cell: ({ row }) => row.original.to?.contact || "N/A",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const stat = row.getValue("status") as string;
        const { bg, text } = getStatusVariant(stat);
        return <Badge className={`${bg} ${text} px-2 py-1 rounded-md shadow-sm`}>{stat}</Badge>;
      },
    },
    { accessorKey: "size", header: "Size (cm)" },
    { accessorKey: "destination", header: "Destination" },
    {
      accessorKey: "completedAt",
      header: "Completed On",
      cell: ({ row }) => format(new Date(row.getValue("completedAt")), "MMM dd, yyyy"),
    },
    {
      id: "options",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 w-7">
              <MoreVertical className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => {
              setSelectedId(row.original.id);
              setShowDetails(true);
            }}>
              See Full Info
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { globalFilter: searchTerm },
    onGlobalFilterChange: setSearchTerm,
    initialState: { pagination: { pageSize: 6 } },
  });

  if (loading) return <LoadingSpinner />;

  if (error || !data.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 p-8">
        <Truck className="w-12 h-12 text-orange-400 opacity-60" />
        <h3 className="text-lg font-semibold text-orange-700">No Delivery Records</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Your delivery history is empty. Start tracking new parcels soon!</p>
      </div>
    );
  }

  const details = parcelDetails?.item;
  const statusVariant = details ? getStatusVariant(details.status) : { bg: "", text: "" };

  return (
    <Card className="m-4 shadow-lg border-0 bg-gradient-to-br from-orange-50/80 to-white dark:from-orange-950/50 dark:to-gray-900 rounded-3xl overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle className="w-6 h-6 text-orange-500" />
          <CardTitle className="text-2xl font-bold text-orange-700">My Delivery Records</CardTitle>
        </div>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          Track your past successful deliveries with full details.
        </CardDescription>
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search by ID, name, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-white/50"
            />
            {searchTerm && (
              <Button variant="outline" size="sm" onClick={() => setSearchTerm("")}>
                Clear
              </Button>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                View Columns <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {table.getAllColumns().filter((col) => col.getCanHide()).map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={col.getIsVisible()}
                  onCheckedChange={(val) => col.toggleVisibility(!!val)}
                >
                  {col.id?.replace(/_/g, " ")}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((group) => (
                <TableRow key={group.id}>
                  {group.headers.map((header) => (
                    <TableHead key={header.id} className="bg-orange-50/50 dark:bg-orange-900/20">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="animate-fade-in hover:bg-orange-25 dark:hover:bg-orange-900/30 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-12">
                    <Truck className="mx-auto w-10 h-10 text-gray-400 mb-2" />
                    <p className="text-gray-500">No matching deliveries found.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between p-4 border-t bg-orange-50/50 dark:bg-orange-900/20">
          <span className="text-sm text-gray-500">Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Back
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Forward
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-md rounded-2xl bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-orange-700">
              <Truck className="w-5 h-5" /> Delivery Info
            </DialogTitle>
            <DialogDescription>Complete details for this delivery.</DialogDescription>
          </DialogHeader>
          {detailsLoading ? (
            <LoadingSpinner />
          ) : details ? (
            <div className="space-y-3 text-sm">
              <div><strong>ID:</strong> {details.id}</div>
              <div className="flex items-center gap-2">
                <strong>Status:</strong>
                <Badge className={`${statusVariant.bg} ${statusVariant.text}`}>{details.status}</Badge>
              </div>
              <div><strong>Category:</strong> {details.category}</div>
              <div><strong>Size:</strong> {details.size} cm</div>
              <div><strong>Destination:</strong> {details.destination}</div>
              <DropdownMenuSeparator className="my-2" />
              <h5 className="font-medium text-orange-600">Sender</h5>
              <div><strong>Name:</strong> {details.from?.name}</div>
              <div><strong>Contact:</strong> {details.from?.contact}</div>
              <DropdownMenuSeparator className="my-2" />
              <h5 className="font-medium text-orange-600">Receiver</h5>
              <div><strong>Name:</strong> {details.to?.name}</div>
              <div><strong>Contact:</strong> {details.to?.contact}</div>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">Unable to load details.</div>
          )}
        </DialogContent>
      </Dialog>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.3s ease-in; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </Card>
  );
};

export default MyDeliveries;