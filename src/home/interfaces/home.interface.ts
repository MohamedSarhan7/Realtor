import { PropertyType } from '@prisma/client';

export interface createHomeParams {
  address: string;
  number_of_bedrooms: number;
  number_of_bathrooms: number;
  city: string;
  price: number;
  land_size: number;
  propertyType: PropertyType;
}
