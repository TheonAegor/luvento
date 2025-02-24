import { BaseEntity, AddressInfo } from "src/types/room";


export enum HouseType {
    HOTEL = 'HOTEL',// Отель
    APARTMENT_BUILDING = 'APARTMENT_BUILDING',// Многоквартирный дом
    GUEST_HOUSE = 'GUEST_HOUSE',// Гостевой дом
    VILLA = 'VILLA' // Вилла
}

/** Структура дома/здания 
 * Дом является абстракцией для многоквартирного дома, отеля, гостевого дома, виллы
 * Конфигурация для комнаты будет наследоваться от дома, в случае если она не будет задана в комнате
 * 
 * ?? Как быть если дом и комната являются одним объектом
*/
export interface House extends BaseEntity, AddressInfo {
    uuid: string;
    type: HouseType;
    name: string; // Название дома
    description: string; // Описание дома
    source_id: number; // Источник данных. Мы можем импортировать объекты из внешних источников
    /** Рейтинг дома; применим только для отелей */
    rating: number;
    floors: number;
    total_rooms: number;
    amenities: string[]; // Удобства
    rules: string[]; // Правила проживания
    check_in_time: string; // Время заезда
    check_out_time: string; // Время выезда
}/** Тип дома/здания */
