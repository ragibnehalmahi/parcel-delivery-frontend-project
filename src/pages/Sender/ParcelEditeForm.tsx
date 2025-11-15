// ParcelEditForm.tsx
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Card } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useSearchUserByEmailQuery,useUpdateParcelMutation } from '@/redux/features/auth.api';
  // Assuming this is the import path

// Assuming Parcel type is defined elsewhere
interface Parcel {
  _id: string;
  receiver: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  parcelType: string;
  weight: number;
  deliveryAddress: string;
}

interface ParcelEditFormProps {
  parcel: Parcel;
  onEditSuccess: () => void;
}

const parcelEditSchema = z.object({
  receiverName: z.string().optional(),
  receiverEmail: z.string().email({ message: 'A valid email is required.' }).optional(),
  receiverPhone: z.string().optional(),
  receiverAddress: z.string().optional(),
  parcelType: z.string().optional(),
  weight: z.number().optional(),
  deliveryAddress: z.string().optional(),
});

type ParcelEditFormData = z.infer<typeof parcelEditSchema>;

export const ParcelEditForm: React.FC<ParcelEditFormProps> = ({ parcel, onEditSuccess }) => {
  const [receiverEmail, setReceiverEmail] = useState(parcel.receiver.email || '');
  const { data: userData, isLoading: isSearchingUser } = useSearchUserByEmailQuery(receiverEmail, {
    skip: !receiverEmail,
  });
  const [updateParcel, { isLoading: isUpdating }] = useUpdateParcelMutation();

  const form = useForm<ParcelEditFormData>({
    resolver: zodResolver(parcelEditSchema),
    defaultValues: {
      receiverName: parcel.receiver.name || '',
      receiverEmail: parcel.receiver.email || '',
      receiverPhone: parcel.receiver.phone || '',
      receiverAddress: parcel.receiver.address || '',
      parcelType: parcel.parcelType || '',
      weight: parcel.weight || 0,
      deliveryAddress: parcel.deliveryAddress || '',
    },
  });

  useEffect(() => {
    form.reset({
      receiverName: parcel.receiver.name || '',
      receiverEmail: parcel.receiver.email || '',
      receiverPhone: parcel.receiver.phone || '',
      receiverAddress: parcel.receiver.address || '',
      parcelType: parcel.parcelType || '',
      weight: parcel.weight || 0,
      deliveryAddress: parcel.deliveryAddress || '',
    });
    setReceiverEmail(parcel.receiver.email || '');
  }, [parcel, form]);

  useEffect(() => {
    if (userData?.data?._id) {
      form.setValue('receiverName', userData.data.name);
    } else if (receiverEmail && !isSearchingUser) {
      form.setValue('receiverName', '');
      toast.error('No user found with this email.');
    }
  }, [userData, isSearchingUser, receiverEmail, form]);

  const onSubmit = async (data: ParcelEditFormData) => {
    const payload: any = {};
    const receiverPayload: any = {};

    if (data.receiverName !== parcel.receiver.name) receiverPayload.name = data.receiverName;
    if (data.receiverEmail !== parcel.receiver.email) receiverPayload.email = data.receiverEmail;
    if (data.receiverPhone !== parcel.receiver.phone) receiverPayload.phone = data.receiverPhone;
    if (data.receiverAddress !== parcel.receiver.address) receiverPayload.address = data.receiverAddress;

    if (data.parcelType !== parcel.parcelType) payload.parcelType = data.parcelType;
    if (data.weight !== parcel.weight) payload.weight = data.weight;
    if (data.deliveryAddress !== parcel.deliveryAddress) payload.deliveryAddress = data.deliveryAddress;

    if (Object.keys(receiverPayload).length > 0) payload.receiver = receiverPayload;

    if (Object.keys(payload).length === 0) {
      toast.error('No changes detected.');
      return;
    }

    try {
      await updateParcel({ parcelId: parcel._id, data: payload }).unwrap();
      toast.success('Parcel updated successfully!');
      onEditSuccess();
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to update parcel.');
    }
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">Receiver's Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="receiverEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Receiver Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onBlur={(e) => {
                          setReceiverEmail(e.target.value);
                          field.onBlur();
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
                    <FormLabel>Receiver Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Receiver Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Receiver Address</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">Parcel Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="parcelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parcel Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Computer">Computer</SelectItem>
                          <SelectItem value="Document">Document</SelectItem>
                          <SelectItem value="Gadget">Gadget</SelectItem>
                          <SelectItem value="Book">Book</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
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
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
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
                  <FormItem className="md:col-span-2">
                    <FormLabel>Delivery Address</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" disabled={isUpdating} className="w-full">
            {isUpdating ? 'Updating...' : 'Update Parcel'}
          </Button>
        </form>
      </Form>
    </Card>
  );
};