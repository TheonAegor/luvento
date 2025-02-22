import { Room, RoomType } from '../types/room';

export const mockRooms: Room[] = [
    {
        uuid: "550e8400-e29b-41d4-a716-446655440000",
        house_uuid: "b5d5d9a6-0ea5-4453-9f8a-7a13d411a0ab",
        number: 101,
        floor: 1,
        description: "Стандартный номер с видом на город",
        base_price: 3500,
        type: RoomType.STANDARD,
        source_id: 1,
        rating: 4,
        create_date: new Date("2024-01-01"),
        update_date: new Date("2024-01-01")
    },
    {
        uuid: "550e8400-e29b-41d4-a716-446655440001",
        house_uuid: "b5d5d9a6-0ea5-4453-9f8a-7a13d411a0ab",
        number: 201,
        floor: 2,
        description: "Улучшенный номер с балконом",
        base_price: 5000,
        type: RoomType.DELUXE,
        source_id: 1,
        rating: 5,
        create_date: new Date("2024-01-01"),
        update_date: new Date("2024-01-01")
    },
    {
        uuid: "550e8400-e29b-41d4-a716-446655440002",
        house_uuid: "b5d5d9a6-0ea5-4453-9f8a-7a13d411a0ab",
        number: 301,
        floor: 3,
        description: "Люкс с двумя спальнями",
        base_price: 8000,
        type: RoomType.SUITE,
        source_id: 1,
        rating: 5,
        create_date: new Date("2024-01-01"),
        update_date: new Date("2024-01-01")
    }
]; 