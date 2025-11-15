import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Password from "@/components/ui/Password";
import { useChangePasswordMutation } from "@/redux/features/auth.api";

const passwordSchema = z
  .object({
    oldPassword: z.string().min(6, "Old password must be at least 6 characters."),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Must contain at least one number.")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character."),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match.",
    path: ["confirmNewPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

const PasswordChangeForm = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (values: PasswordFormData) => {
    try {
      const res = await changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      }).unwrap();

      if (res.success) {
        toast.success(res.message || "Password changed successfully!");
        form.reset();
      } else {
        toast.error("Something went wrong.");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to change password.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-neutral-900 rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">🔒 Change Password</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <Password {...field} placeholder="Enter your old password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Password {...field} placeholder="Enter new password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Password {...field} placeholder="Re-enter new password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Change Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PasswordChangeForm;
