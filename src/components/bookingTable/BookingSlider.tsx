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
  client_surname: z.string().min(1, 'Фамилия обязательна'),
  email: z.string().email('Неверный формат email').min(1, 'Email обязателен'),
  phone: z.string().min(1, 'Телефон обязателен'),
  adults: z.number().min(1, 'Количество взрослых должно быть не менее 1'),
  children: z.number().min(0, 'Количество детей не может быть отрицательным'),
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Создание бронирования</h2>
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