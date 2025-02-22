/** Тип номера помещения */
export enum RoomType {
    STANDARD = 1,
    DELUXE = 2,
    SUITE = 3,
    // ... другие типы
}

/** Базовая структура для технических полей */
interface BaseEntity {
    create_date: Date;
    update_date: Date;
}

/** Структура комнаты/номера */
export interface Room extends BaseEntity {
    uuid: string;
    house_uuid: string;
    number: number;
    floor: number;
    description: string;
    base_price: number;
    type: RoomType;
    source_id: number;
    rating: number;
}

/** Структура для создания новой комнаты */
export type CreateRoomDto = Omit<Room, keyof BaseEntity | 'uuid'>;

/** Структура для обновления комнаты */
export type UpdateRoomDto = Partial<CreateRoomDto>;

/** Структура для фильтрации комнат */
export interface RoomFilters {
    house_uuid?: string;
    floor?: number;
    type?: RoomType;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
} 