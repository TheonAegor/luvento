import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import apiClient from './apiClient';
import {
  ListPropertiesResponse,
  Property,
  CreatePropertyRequest,
  ListBookingsResponse,
  Booking,
  CreateBookingRequest,
  SyncListingsRequest,
  SyncListingsResponse,
} from '../types/api.types';

// Хуки для работы с объектами недвижимости
export const useProperties = (params?: {
  user_id?: string;
  pagination?: { limit: number; offset: number };
}, options?: UseQueryOptions<ListPropertiesResponse>) => {
  return useQuery({
    queryKey: ['properties', params],
    queryFn: () => apiClient.listProperties(params),
    ...options,
  });
};

export const useCreateProperty = (
  options?: UseMutationOptions<Property, Error, CreatePropertyRequest>
) => {
  return useMutation({
    mutationFn: (property: CreatePropertyRequest) => apiClient.createProperty(property),
    ...options,
  });
};

// Хуки для работы с бронированиями
export const useBookings = (params?: {
  property_id?: string;
  start_date?: string;
  end_date?: string;
}, options?: UseQueryOptions<ListBookingsResponse>) => {
  return useQuery({
    queryKey: ['bookings', params],
    queryFn: () => apiClient.listBookings(params),
    ...options,
  });
};

export const useCreateBooking = (
  options?: UseMutationOptions<Booking, Error, CreateBookingRequest>
) => {
  return useMutation({
    mutationFn: (booking: CreateBookingRequest) => apiClient.createBooking(booking),
    ...options,
  });
};

// Хук для синхронизации
export const useSyncListings = (
  options?: UseMutationOptions<SyncListingsResponse, Error, SyncListingsRequest>
) => {
  return useMutation({
    mutationFn: (request: SyncListingsRequest) => apiClient.syncListings(request),
    ...options,
  });
}; 