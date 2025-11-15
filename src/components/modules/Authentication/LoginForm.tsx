import { useState } from "react";
import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import Password from "@/components/ui/Password";
import { useLoginMutation } from "@/redux/features/auth.api";
import { cn } from "@/lib/utils";

const presetAccounts = [
  {
    label: "ADMIN",
    email: import.meta.env.VITE_ADMIN_MAIL,
    password: import.meta.env.VITE_ADMIN_PASSWORD,
  },
  {
    label: "SENDER",
    email: import.meta.env.VITE_SENDER_MAIL,
    password: import.meta.env.VITE_SENDER_PASSWORD,
  },
  {
    label: "RECEIVER",
    email: import.meta.env.VITE_RECEIVER_MAIL,
    password: import.meta.env.VITE_RECEIVER_PASSWORD,
  },
];

const LoginForm = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 🟢 Autofill role credentials
  const handleSelectRole = (role: string) => {
    const account = presetAccounts.find((acc) => acc.label === role);
    if (account) {
      form.setValue("email", account.email || "");
      form.setValue("password", account.password || "");
      setSelected(role);
      toast.success(`${role} credentials applied`);
      setShowModal(false);
    }
  };

  // 🟢 Login handler
  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();

      // ✅ Check backend success flag
      if (res?.success) {
        toast.success(res?.message || "Login successful!");
        navigate("/");
      } else {
        toast.error(res?.message || "Login failed!");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.data?.message || "Unexpected error occurred. Try again."
      );
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-8", className)}>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary">
          Welcome Back 👋
        </h1>
        <p className="text-muted-foreground text-sm">
          Enter your credentials to access your account
        </p>
      </div>

      {/* Form Start */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="w-full max-w-md space-y-6 bg-white/60 dark:bg-slate-900/40 p-8 rounded-2xl shadow-lg backdrop-blur-md"
        >
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="user@example.com"
                    required
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Password {...field} required disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="space-y-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full font-semibold"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full py-4 font-bold bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600 text-white shadow-md hover:scale-105 transition-all duration-300 border-none"
              onClick={() => setShowModal(true)}
            >
              ⚡ Autofill Demo Credentials
            </Button>
          </div>
        </form>
      </Form>

      {/* Role Selection Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              Select a Role to Autofill
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-3 py-4">
            {presetAccounts.map((acc) => (
              <Button
                key={acc.label}
                onClick={() => handleSelectRole(acc.label)}
                className={cn(
                  "border-2 text-lg font-semibold transition-all duration-300",
                  selected === acc.label
                    ? "border-orange-500 bg-orange-100 text-orange-700"
                    : "border-gray-300"
                )}
                variant="outline"
              >
                {acc.label}
              </Button>
            ))}
          </div>

          <DialogFooter>
            <p className="text-xs text-center text-muted-foreground">
              Select a role to automatically fill in credentials.
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Divider */}
      <div className="relative w-full max-w-md text-center text-sm">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>
        <span className="relative bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>

      {/* Google Login Button */}
      <Button
        variant="outline"
        className="w-full max-w-md mt-2 border-gray-400 hover:bg-gray-100"
      >
        Sign in with Google
      </Button>
    </div>
  );
};

export default LoginForm;
