import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { BadgeCheck } from "lucide-react";
import PersonalInfoForm from "./PersonalInfoForm";
import PasswordChangeForm from "./PasswordChangeForm";
import { useUserInfoQuery } from "@/redux/features/auth.api";
import { toast } from "sonner";

const ProfilePage = () => {
  // ✅ RTK Query hook with auto refetching
  const {
    data: userResponse,
    isLoading,
    isError,
    refetch,
  } = useUserInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const user = userResponse?.data;

  // ✅ Manual refetch on mount (extra reliability)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await refetch();
      } catch (error) {
        console.error("❌ Refetch failed:", error);
        toast.error("Failed to fetch latest profile info");
      }
    };
    fetchProfile();
  }, [refetch]);

  // ✅ Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full p-4">
        <Skeleton className="w-full max-w-2xl h-[400px] rounded-lg" />
      </div>
    );
  }

  // ✅ Error / Missing user state
  if (isError || !user) {
    return (
      <div className="text-center text-red-500 p-8">
        Failed to load user profile.
      </div>
    );
  }

  // ✅ Normalize status (case-insensitive)
  const normalizedStatus = user.status?.toUpperCase();
  const isActive = normalizedStatus === "ACTIVE";
  const isBlocked = normalizedStatus === "BLOCKED";

  // ✅ Status badge color
  const statusClasses = isActive
    ? "bg-green-100 text-green-700 border-green-200"
    : isBlocked
    ? "bg-gray-200 text-gray-700 border-gray-300"
    : "bg-red-100 text-red-700 border-red-200";

  return (
    <div className="p-6 flex flex-col items-center">
      {/* 🧍‍♂️ Profile Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-24 h-24 mb-4">
          <Avatar className="w-24 h-24">
            <AvatarFallback className="text-4xl">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          {/* 🟢 Active/Inactive Indicator */}
          <span
            className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 ${
              isActive ? "bg-green-500" : isBlocked ? "bg-gray-400" : "bg-red-500"
            }`}
            title={normalizedStatus}
          ></span>
        </div>

        <h1 className="text-3xl font-bold flex items-center gap-2">
          {user.name}
          {isActive && <BadgeCheck className="w-6 h-6 text-green-500" />}
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-lg">{user.email}</p>

        <div className="flex gap-4 mt-3">
          {/* 🧩 Role Badge */}
          <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold border border-orange-200 text-sm">
            Role: {user.role}
          </span>

          {/* 🟢 Status Badge */}
          <span
            className={`px-3 py-1 rounded-full font-semibold border text-sm ${statusClasses}`}
          >
            {normalizedStatus}
          </span>
        </div>
      </div>

      {/* ⚙️ Profile Settings Tabs */}
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-orange-700">
            Profile Settings
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="info">Personal Info</TabsTrigger>
              <TabsTrigger value="password">Change Password</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <PersonalInfoForm initialData={user} />
            </TabsContent>

            <TabsContent value="password">
              <PasswordChangeForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
