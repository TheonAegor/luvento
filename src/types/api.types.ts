// Базовые типы ответов и запросов
export interface HealthResponse {
  postgres: {
    status: boolean;
    error?: string;
  };
}

export interface Property {
  uuid: string;
  name: string;
  country: number;
  city: number;
  address: string;
  phone: string;
  email: string;
  geo_data: Record<string, string>;
  source_id: number;
  rating: number;
  base_price: number;
  type: number;
  number: number;
  floor: number;
  description: string;
  create_date: string;
  update_date: string;
}

export interface CreatePropertyRequest {
  name: string;
  country: number;
  city: number;
  address: string;
  phone: string;
  email: string;
  geo_data: Record<string, string>;
  source_id: number;
  base_price: number;
  type: number;
  number: number;
  floor: number;
  description: string;
}

export interface ListPropertiesResponse {
  properties: Property[];
  total: number;
}

export interface Booking {
  uuid: string;
  client_name: string;
  client_surname: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  property_uuid: string;
  tariff: number;
  status_id: number;
  services: Record<string, string>;
  payment: number;
  price_per: number;
  amount_total: number;
  is_hourly: boolean;
  arrival_date: string;
  departure_date: string;
  source_id: number;
  external_booking_id: string;
  is_manual: boolean;
  notes: string;
  tag: string;
  create_date: string;
  update_date: string;
}

export interface CreateBookingRequest {
  booking: Booking;
}

export interface ListBookingsResponse {
  bookings: Booking[];
}

export interface SyncListingsRequest {
  source_id: number;
  user_id: string;
}

export interface SyncListingsResponse {
  status: 'UNKNOWN' | 'SUCCESS' | 'PARTIAL' | 'FAILED';
  message: string;
  updated_listings: number;
  updated_bookings: number;
} 

export interface ListBookingsFilter {
  property_uuid?: string;
  arrival_date?: string;
  departure_date?: string;
}