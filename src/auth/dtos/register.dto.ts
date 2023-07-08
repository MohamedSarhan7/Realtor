import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsOptional,
  // IsStrongPassword,
  Length,
} from 'class-validator';
import { UserType } from '@prisma/client';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(5, 20)
  readonly password: string;

  @IsOptional()
  @IsEnum(UserType)
  readonly user_type: UserType;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly productKey: string;
}
