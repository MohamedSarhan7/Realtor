import { PropertyType } from '@prisma/client';

export class HomeDto {}
export class HomeResponseDto {
  id: number;
  address: string;
  number_of_bedrooms: number;
  number_of_bathrooms: number;
  city: string;
  price: number;
  land_size: number;
  propertyType: PropertyType;
  created_at: Date;
  updated_at: Date;
  realtor_id: number;
  images: any[];
  constructor(parital: Partial<HomeResponseDto>) {
    Object.assign(this, parital);
  }
}
