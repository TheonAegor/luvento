export interface BookingFormData {
    client_name: string;
    client_surname: string;
    email: string;
    phone: string;
    adults: number;
    children: number;
    tariff: number;
    payment: number;
    price_per: number;
    amount_total: number;
    is_hourly: boolean;
    notes: string;
    tag: string;
}

export interface BookingSelection {
    rooms: string[]; // массив room_uuid
    arrival_date: Date;
    departure_date: Date;
}

export interface Booking {
    uuid: string;
    room_uuid: string;
    start_date: Date;
    end_date: Date;
    guest_name: string;
    guest_phone: string;
    guest_email: string;
    status: BookingStatus;
    create_date: Date;
    update_date: Date;
}

export enum BookingStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED'
} 