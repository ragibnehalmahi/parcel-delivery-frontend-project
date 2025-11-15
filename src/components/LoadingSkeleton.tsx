import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const LoadingSkeleton = () => {
  return (
    <div className="p-6 md:p-10 space-y-10 animate-pulse">
      {/* 🔹 Header Loading Section */}
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-9 w-60 rounded-md" />
        <Skeleton className="h-9 w-28 rounded-md" />
      </div>

      {/* 🔹 Dashboard Overview Skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Card key={idx}>
            <CardHeader className="flex flex-row justify-between items-center pb-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-8 w-28" />
              <Skeleton className="h-3 w-40 rounded-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 🔹 Table Loading Skeleton */}
      <div className="border rounded-lg p-5 space-y-5">
        {/* Table Top Controls */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-44" />
          <Skeleton className="h-7 w-28" />
        </div>

        {/* Table Content */}
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-3"
            >
              <Skeleton className="h-6 w-full rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
