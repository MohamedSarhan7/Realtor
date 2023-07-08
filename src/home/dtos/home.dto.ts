import { PropertyType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class HomeDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsPositive()
  number_of_bedrooms: number;

  @IsNumber()
  @IsPositive()
  number_of_bathrooms: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  land_size: number;

  @IsEnum(PropertyType)
  propertyType: PropertyType;
}

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
