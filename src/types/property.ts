export interface GeoData {
  latitude: number;
  longitude: number;
}

export enum PropertyType {
  HOTEL = 1,
  APARTMENT = 2,
  HOUSE = 3,
  HOSTEL = 4,
  VILLA = 5
}

export interface Property {
  uuid: string;
  name: string;
  parent_uuid?: string;
  country_id: string;
  city_id: string;
  address: string;
  phone: string;
  email: string;
  geo_data: GeoData;
  source_id: number;
  rating: number;
  base_price: number;
  type: PropertyType;
  number: number;
  floor: number;
  description: string;
  create_date: Date;
  update_date: Date;
}

export class PropertyModel implements Property {
  uuid: string;
  name: string;
  parent_uuid?: string;
  country_id: string;
  city_id: string;
  address: string;
  phone: string;
  email: string;
  geo_data: GeoData;
  source_id: number;
  rating: number;
  base_price: number;
  type: PropertyType;
  number: number;
  floor: number;
  description: string;
  create_date: Date;
  update_date: Date;

  constructor(data: Partial<Property>) {
    this.uuid = data.uuid || crypto.randomUUID();
    this.name = data.name || '';
    this.parent_uuid = data.parent_uuid || undefined;
    this.country_id = data.country_id || '';
    this.city_id = data.city_id || '';
    this.address = data.address || '';
    this.phone = data.phone || '';
    this.email = data.email || '';
    this.geo_data = data.geo_data || { latitude: 0, longitude: 0 };
    this.source_id = data.source_id || 0;
    this.rating = data.rating || 0;
    this.base_price = data.base_price || 0;
    this.type = data.type || PropertyType.HOTEL;
    this.number = data.number || 0;
    this.floor = data.floor || 0;
    this.description = data.description || '';
    this.create_date = data.create_date || new Date();
    this.update_date = data.update_date || new Date();
  }

  update(data: Partial<Property>): void {
    Object.assign(this, {
      ...data,
      update_date: new Date()
    });
  }

  toJSON(): Property {
    return {
      uuid: this.uuid,
      name: this.name,
      parent_uuid: this.parent_uuid,
      country_id: this.country_id,
      city_id: this.city_id,
      address: this.address,
      phone: this.phone,
      email: this.email,
      geo_data: this.geo_data,
      source_id: this.source_id,
      rating: this.rating,
      base_price: this.base_price,
      type: this.type,
      number: this.number,
      floor: this.floor,
      description: this.description,
      create_date: this.create_date,
      update_date: this.update_date
    };
  }
} 