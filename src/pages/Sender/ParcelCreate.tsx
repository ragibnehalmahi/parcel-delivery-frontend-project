// ParcelCreate.tsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useParcelMutation,useSearchUserByEmailQuery } from '@/redux/features/auth.api';
 // Assuming this is the import path

const parcelSchema = z.object({
  receiverName: z.string().min(1, 'Receiver name is required'),
  receiverEmail: z.string().email('Please enter a valid email address'),
  receiverPhone: z.string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[\d\s-()]+$/, 'Please enter a valid phone number'),
  receiverAddress: z.string()
    .min(1, 'Receiver address is required')
    .min(10, 'Address should be at least 10 characters long'),
  parcelType: z.string().min(1, 'Please select a parcel type'),
  weight: z.number()
    .positive('Weight must be a positive number')
    .min(0.1, 'Weight must be at least 0.1 kg')
    .max(100, 'Weight cannot exceed 100 kg'),
  deliveryAddress: z.string()
    .min(1, 'Delivery address is required')
    .min(10, 'Delivery address should be at least 10 characters long'),
});

type ParcelFormData = z.infer<typeof parcelSchema>;

const ParcelCreate: React.FC = () => {
  const navigate = useNavigate();
  const [parcel, { isLoading: isSubmitting }] = useParcelMutation();
  const [receiverEmail, setReceiverEmail] = useState('');
  const { data: userData, isLoading: isSearchingUser } = useSearchUserByEmailQuery(receiverEmail, {
    skip: !receiverEmail,
  });

  const form = useForm<ParcelFormData>({
    resolver: zodResolver(parcelSchema),
    defaultValues: {
      receiverName: '',
      receiverEmail: '',
      receiverPhone: '',
      receiverAddress: '',
      parcelType: '',
      weight: 0,
      deliveryAddress: '',
    },
  });

  useEffect(() => {
    if (userData?.data?._id) {
      form.setValue('receiverName', userData.data.name);
    } else if (receiverEmail && !isSearchingUser) {
      form.setValue('receiverName', '');
      toast.error('No user found with this email.');
    }
  }, [userData, isSearchingUser, receiverEmail, form]);

  const onSubmit = async (data: ParcelFormData) => {
    if (!userData?.data?._id) {
      toast.error('Receiver user not found. Please check the email.');
      return;
    }

    const payload = {
      ...data,
      receiverUserId: userData.data._id,
    };

    try {
      await parcel(payload).unwrap();
      toast.success('Parcel created successfully!');
      navigate('/sender/viewallcreatedparcels');
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to create parcel.');
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Parcel</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <Input {...field} disabled={!!userData?.data?._id} />
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
              <FormItem>
                <FormLabel>Delivery Address</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Creating...' : 'Create Parcel'}
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default ParcelCreate;
