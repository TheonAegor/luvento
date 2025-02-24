import { Booking, BookingStatus } from '../types/booking';

export const mockBookings: Booking[] = [
    {
        uuid: "b1d5d9a6-0ea5-4453-9f8a-7a13d411a0ab",
        room_uuid: "550e8400-e29b-41d4-a716-446655440000",
        start_date: new Date("2024-03-15"),
        end_date: new Date("2024-03-20"),
        guest_name: "Иван Петров",
        guest_phone: "+7 999 123 45 67",
        guest_email: "ivan@example.com",
        status: BookingStatus.CONFIRMED,
        create_date: new Date("2024-03-01"),
        update_date: new Date("2024-03-01")
    }
]; 