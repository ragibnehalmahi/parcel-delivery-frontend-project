import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Parcel, ParcelStatus, UpdateParcelStatusDTO } from "@/type/parcel.types";
import { useUpdateParcelMutation } from "@/redux/features/parcels/parcel.api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


// ✅ Props Interface
interface ParcelEditFormProps {
  parcel: Parcel;
  onEditSuccess: () => void;
}


// ✅ Validation Schema
const formSchema = z.object({
  status: z.nativeEnum(ParcelStatus),
  location: z.string().optional(),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;


// ✅ Component Start
const ParcelEditForm: React.FC<ParcelEditFormProps> = ({ parcel, onEditSuccess }) => {
  const [updateParcel, { isLoading }] = useUpdateParcelMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: parcel.currentStatus,
      location: parcel.statusLogs?.[parcel.statusLogs.length - 1]?.location || "",
      note: "",
    },
  });

  // ✅ Reset form values when new parcel comes
  useEffect(() => {
    if (parcel) {
      form.reset({
        status: parcel.currentStatus,
        location: parcel.statusLogs?.[parcel.statusLogs.length - 1]?.location || "",
        note: "",
      });
    }
  }, [parcel, form]);

  // ✅ Submit handler
  const onSubmit = async (values: FormValues) => {
    const payload: UpdateParcelStatusDTO = {
      status: values.status,
      location: values.location,
      note: values.note,
    };

    try {
      const res = await updateParcel({ parcelId: parcel._id!, data: payload }).unwrap();
      if (res.success) {
        toast.success("Parcel updated successfully!");
        onEditSuccess(); // close modal
      } else {
        toast.error(res.message || "Failed to update parcel");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">
        Edit Parcel Status
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Tracking ID */}
          <div>
            <FormLabel>Tracking ID</FormLabel>
            <Input value={parcel.trackingId} disabled className="bg-gray-100" />
          </div>

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Update Status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(ParcelStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter location (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Note */}
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Add note (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ParcelEditForm;
