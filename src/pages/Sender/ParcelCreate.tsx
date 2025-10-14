// src/pages/sender/ParcelCreate.tsx

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParcelMutation } from "@/redux/features/parcels/parcel.api";
import { useSearchUserByEmailQuery } from "@/redux/features/users/user.api";

 

// 🧩 Form validation schema using Zod
const parcelSchema = z.object({
  receiverEmail: z.string().email("Please enter a valid email."),
  receiverName: z.string().min(1, "Receiver name is required."),
  receiverPhone: z.string().min(1, "Receiver phone is required."),
  receiverAddress: z.string().min(1, "Receiver address is required."),
  parcelType: z.string().min(1, "Select a parcel type."),
  weight: z
    .number({ error: "Weight must be a number." })
    .positive("Weight must be greater than 0."),
  deliveryAddress: z.string().min(1, "Delivery address is required."),
});

type ParcelFormData = z.infer<typeof parcelSchema>;

const ParcelCreate: React.FC = () => {
  const navigate = useNavigate();
  const [createParcel] = useParcelMutation();

  const [email, setEmail] = useState("");
  const { data: userData, isFetching } = useSearchUserByEmailQuery(email, {
    skip: !email,
  });

  const form = useForm<ParcelFormData>({
    resolver: zodResolver(parcelSchema),
    defaultValues: {
      receiverEmail: "",
      receiverName: "",
      receiverPhone: "",
      receiverAddress: "",
      parcelType: "",
      weight: 0,
      deliveryAddress: "",
    },
  });

  // 🧠 Auto-fill receiver info if found
  useEffect(() => {
    if (userData?.data?._id) {
      form.setValue("receiverName", userData.data.name);
      toast.success(`Receiver found: ${userData.data.name}`);
    } else if (email && !isFetching) {
      form.resetField("receiverName");
      toast.error("No user found with this email.");
    }
  }, [userData, email, isFetching, form]);

  // 🚀 Handle Form Submission
  const handleSubmit = async (data: ParcelFormData) => {
    const receiverId = userData?.data?._id;

    if (!receiverId) {
      toast.error("Please provide a valid receiver email.");
      return;
    }

    const payload = {
      receiver: {
        name: data.receiverName,
        phone: data.receiverPhone,
        address: data.receiverAddress,
        userId: receiverId,
      },
      parcelType: data.parcelType,
      weight: data.weight,
      deliveryAddress: data.deliveryAddress,
    };

    try {
      await createParcel(payload).unwrap();
      toast.success("Parcel created successfully!");
      navigate("/sender/viewallcreatedparcels");
    } catch (err: any) {
      const message =
        err?.data?.message || "Failed to create parcel. Please try again.";
      toast.error(message);
      console.error("Parcel creation error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-3 py-6">
      <Card className="w-full max-w-2xl shadow-md border-0">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-orange-600">
            Create New Parcel
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Receiver Info Section */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-700 border-b pb-1">
                  Receiver Information
                </h2>

                <FormField
                  control={form.control}
                  name="receiverEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Receiver email"
                          type="email"
                          {...field}
                          onBlur={(e) => {
                            field.onBlur();
                            setEmail(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="receiverName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Receiver name"
                          {...field}
                          disabled={!!userData?.data?._id}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="receiverPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Receiver phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="receiverAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Receiver address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>

              {/* Parcel Details Section */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-700 border-b pb-1">
                  Parcel Details
                </h2>

                <FormField
                  control={form.control}
                  name="parcelType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parcel Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Document">Document</SelectItem>
                          <SelectItem value="Gadget">Gadget</SelectItem>
                          <SelectItem value="Book">Book</SelectItem>
                          <SelectItem value="Clothing">Clothing</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter weight"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deliveryAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Delivery address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Create Parcel
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParcelCreate;
