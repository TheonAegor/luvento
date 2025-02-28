import axios, { AxiosInstance } from 'axios';
import {
  HealthResponse,
  Property,
  CreatePropertyRequest,
  ListPropertiesResponse,
  Booking,
  CreateBookingRequest,
  ListBookingsResponse,
  SyncListingsRequest,
  SyncListingsResponse,
} from '../types/api.types';

class ApiClient {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Проверка здоровья сервиса
  async checkHealth(): Promise<HealthResponse> {
    const { data } = await this.api.get<HealthResponse>('/health');
    return data;
  }

  // Методы для работы с объектами недвижимости
  async listProperties(params?: {
    user_id?: string;
    pagination?: { limit: number; offset: number };
  }): Promise<ListPropertiesResponse> {
    const { data } = await this.api.get<ListPropertiesResponse>('/api/v1/properties', {
      params,
    });
    return data;
  }

  async createProperty(property: CreatePropertyRequest): Promise<Property> {
    const { data } = await this.api.post<Property>('/api/v1/properties', property);
    return data;
  }

  // Методы для работы с бронированиями
  async listBookings(params?: {
    property_id?: string;
    start_date?: string;
    end_date?: string;
  }): Promise<ListBookingsResponse> {
    const { data } = await this.api.get<ListBookingsResponse>('/api/v1/bookings', {
      params,
    });
    return data;
  }

  async createBooking(booking: CreateBookingRequest): Promise<Booking> {
    const { data } = await this.api.post<Booking>('/api/v1/bookings', booking);
    return data;
  }

  // Метод для синхронизации
  async syncListings(request: SyncListingsRequest): Promise<SyncListingsResponse> {
    const { data } = await this.api.post<SyncListingsResponse>('/api/v1/sync/listings', request);
    return data;
  }
}

// Создаем экземпляр API клиента
const apiClient = new ApiClient(import.meta.env.VITE_API_URL || 'http://localhost:8081');

export default apiClient; 