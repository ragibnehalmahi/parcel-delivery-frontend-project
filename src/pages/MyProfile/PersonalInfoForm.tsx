import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateUserProfileMutation } from "@/redux/features/auth.api";

const profileSchema = z.object({
  name: z.string().min(3, "Name should be at least 3 characters long."),
  email: z.string().email("Enter a valid email address."),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const PersonalInfoForm = ({ initialData }: { initialData: any }) => {
  const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      email: initialData?.email ?? "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name || "",
        email: initialData.email || "",
      });
    }
  }, [initialData, form]);

  const handleUpdate = async (values: ProfileFormData) => {
    try {
      const response = await updateProfile({
        id: initialData._id,
        body: { name: values.name },
      }).unwrap(); // 👈 email backend-এ restricted, তাই name-only পাঠানো হলো

      if (response.success) {
        toast.success("Profile updated successfully!");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Unable to update profile.");
    }
  };

  if (!initialData) {
    return <Skeleton className="h-[280px] w-full rounded-xl" />;
  }

  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-5 text-center">🧍‍♂️ Update Personal Info</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <p className="text-xs text-gray-500">
                  Email cannot be changed for security reasons.
                </p>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PersonalInfoForm;
