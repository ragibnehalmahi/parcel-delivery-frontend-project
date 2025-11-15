import { useMemo, useState } from "react";
import {
  useAllUsersQuery,
  useChangeUserStatusMutation,
} from "@/redux/features/auth.api";
import {
  type ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import {
  MoreHorizontal,
  ChevronDown,
  User,
  XCircle,
  PauseCircle,
} from "lucide-react";
import toast from "react-hot-toast";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
};

// 🔹 Badge color logic
const getStatusBadgeVariant = (status: "ACTIVE" | "INACTIVE" | "BLOCKED") => {
  switch (status) {
    case "ACTIVE":
      return "default";
    case "INACTIVE":
      return "secondary";
    case "BLOCKED":
      return "destructive";
    default:
      return "outline";
  }
};

// 🔹 Status change handler hook
const useStatusChangeHandler = (refetch: () => void) => {
  const [changeStatus] = useChangeUserStatusMutation();

  const handleStatusChange = async (
    userId: string,
    newStatus: "ACTIVE" | "INACTIVE" | "BLOCKED"
  ) => {
    try {
      const payload = { userId, status: newStatus };
      await changeStatus(payload).unwrap();

      toast.success(`User status changed to ${newStatus}.`);
      refetch(); // 🔄 Update UI instantly after success
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Failed to update user status.";
      toast.error(errorMessage);
    }
  };

  return handleStatusChange;
};

export default function ManageAllUsers() {
  const { data: users, isLoading, isError, refetch } =
    useAllUsersQuery(undefined);
  const handleStatusChange = useStatusChangeHandler(refetch);
  const [globalFilter, setGlobalFilter] = useState("");

  const tableData = useMemo(() => users?.data || [], [users]);

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            {row.original.name}
          </span>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <span className="text-gray-600 dark:text-gray-300">
            {row.original.email}
          </span>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
          <span className="text-xs rounded bg-orange-50 dark:bg-orange-900 px-2 py-1 text-orange-700 dark:text-orange-300 font-semibold">
            {row.original.role}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            className="px-2 py-1 text-sm"
            variant={getStatusBadgeVariant(row.original.status)}
          >
            {row.original.status}
          </Badge>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const user = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {user.status !== "ACTIVE" && (
                  <DropdownMenuItem
                    onClick={() => handleStatusChange(user._id, "ACTIVE")}
                    className="text-green-600 dark:text-green-400"
                  >
                    <User className="mr-2 h-4 w-4" /> Activate
                  </DropdownMenuItem>
                )}

                {user.status !== "INACTIVE" && (
                  <DropdownMenuItem
                    onClick={() => handleStatusChange(user._id, "INACTIVE")}
                    className="text-yellow-600 dark:text-yellow-400"
                  >
                    <PauseCircle className="mr-2 h-4 w-4" /> Inactivate
                  </DropdownMenuItem>
                )}

                {user.status !== "BLOCKED" && (
                  <DropdownMenuItem
                    onClick={() => handleStatusChange(user._id, "BLOCKED")}
                    className="text-red-600 dark:text-red-400"
                  >
                    <XCircle className="mr-2 h-4 w-4" /> Block
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [handleStatusChange]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 5 },
    },
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <LoadingSkeleton />
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 text-center text-red-500 font-semibold rounded-xl bg-white dark:bg-gray-800 shadow-lg">
          Failed to load user data.
        </div>
      </div>
    );

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-2 py-4">
      <Card className="w-full bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:to-orange-900 shadow-xl border-0 rounded-2xl p-4 md:p-8">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <User className="w-7 h-7 text-orange-500" />
            <CardTitle className="text-2xl md:text-3xl font-extrabold text-orange-700 tracking-tight">
              All Users
            </CardTitle>
          </div>
          <CardDescription className="text-base text-gray-700 dark:text-gray-300">
            Manage all user accounts and their statuses (Active / Inactive /
            Blocked).
          </CardDescription>

          <div className="flex flex-col md:flex-row items-center py-4 justify-between gap-4">
            <Input
              placeholder="Filter by name or email..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(String(event.target.value))}
              className="max-w-sm w-full"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto w-full md:w-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border overflow-x-auto bg-white dark:bg-gray-950 min-h-[400px]">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-base font-semibold whitespace-nowrap"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="hover:bg-orange-50/60 dark:hover:bg-orange-900/20 transition"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="py-3 whitespace-nowrap"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-32 text-center"
                    >
                      <div className="flex flex-col items-center justify-center min-h-[120px] gap-2 py-6">
                        <XCircle className="w-10 h-10 text-gray-400" />
                        <span className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                          No users found
                        </span>
                        <span className="text-base text-gray-500 dark:text-gray-500">
                          Try updating filters or check later.
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-2">
            <span className="text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <div className="flex space-x-2">
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
        </CardContent>
      </Card>
    </div>
  );
}
