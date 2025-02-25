import { BookingFormData, BookingSelection } from '@/types/booking';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface BookingSliderProps {
  selection: BookingSelection | null;
  onClose: () => void;
  onSubmit: (data: BookingFormData & BookingSelection) => void;
}

// Define the validation schema using Zod
const bookingFormSchema = z.object({
  client_name: z.string().min(1, 'Имя обязательно'),
  client_surname: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  adults: z.number().optional(),
  children: z.number().optional(),
  tariff: z.number().optional(),
  payment: z.number().optional(),
  price_per: z.number().optional(),
  amount_total: z.number().optional(),
  is_hourly: z.boolean().optional(),
  notes: z.string().optional(),
  tag: z.string().optional(),
});

const BookingForm: React.FC<BookingSliderProps> = ({ selection, onClose, onSubmit }) => {
  // Initialize the form with react-hook-form and Zod resolver
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      client_name: '',
      client_surname: '',
      email: '',
      phone: '',
      adults: 1,
      children: 0,
      tariff: 1,
      payment: 0,
      price_per: 0,
      amount_total: 0,
      is_hourly: false,
      notes: '',
      tag: '',
    },
  });

  if (selection === null) return null;

  // Handle form submission
  const handleSubmit = (data: BookingFormData) => {
    onSubmit({
      ...data,
      ...selection,
    });
  };

  return (
    <div className="inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="client_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Введите имя" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="client_surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Фамилия</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Введите фамилию" />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Введите email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефон</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" placeholder="Введите телефон" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adults"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Взрослые</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="1"
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      placeholder="Количество взрослых"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="children"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дети</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      placeholder="Количество детей"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="submit" variant="default">
                Создать бронирование
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Закрыть
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BookingForm;