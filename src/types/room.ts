import { House, HouseType } from "./house";

/** Тип номера/помещения */
export enum RoomType {
    HOTEL_ROOM = 'HOTEL_ROOM',     // Номер в отеле
    APARTMENT = 'APARTMENT',       // Квартира
    STUDIO = 'STUDIO',            // Студия
    PENTHOUSE = 'PENTHOUSE'       // Пентхаус
}

/** Базовая структура для технических полей */
export interface BaseEntity {
    create_date: Date;
    update_date: Date;
}

/** Базовая структура для адреса */
export interface AddressInfo {
    country_id: number;
    city_id: number;
    address: string;
    geo_data?: {
        lat: number;
        lng: number;
    };
}

/** Общая структура помещения */
export interface Room extends BaseEntity {
    uuid: string;
    house_uuid: string;      // Ссылка на родительский дом
    type: RoomType;
    number: number;
    floor: number;
    description: string;
    base_price: number;
    capacity: {              // Вместимость
        adults: number;
        children: number;
    };
    area: number;           // Площадь помещения
    amenities: string[];    // Удобства конкретного помещения
    source_id: number;
    rating: number;
}

/** DTO для создания дома */
export type CreateHouseDto = Omit<House, keyof BaseEntity | 'uuid'>;

/** DTO для создания комнаты */
export type CreateRoomDto = Omit<Room, keyof BaseEntity | 'uuid'>;

/** Структура для обновления */
export type UpdateHouseDto = Partial<CreateHouseDto>;
export type UpdateRoomDto = Partial<CreateRoomDto>;

/** Структура для фильтрации */
export interface RoomFilters {
    house_uuid?: string;
    house_type?: HouseType;
    room_type?: RoomType;
    floor?: number;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    minArea?: number;
    capacity_adults?: number;
    capacity_children?: number;
} 