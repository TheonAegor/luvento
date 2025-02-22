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