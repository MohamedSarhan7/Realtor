import { Exclude } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsOptional,
  // IsStrongPassword,
  Length,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(5, 20)
  readonly password: string;
}
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

export class UserResponseDto {
  id: number;
  name: string;
  email: string;
  @Exclude()
  password: string;
  user_type: UserType;
  created_at: Date;
  updated_at: Date;
  token: { key: string; expiresIn: string };
  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}

// @Expose({ name: 'created_at' })
// transformCreatedAt() {
//   const date = new Date(this.created_at);
//   return date.toLocaleString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric',
//     hour12: true,
//     timeZone: 'Africa/Cairo',
//   });
// }

// @Expose({ name: 'updated_at' })
// transformUpdatedAt() {
//   const date = new Date(this.created_at);
//   return date.toLocaleString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric',
//     hour12: true,
//     timeZone: 'Africa/Cairo',
//   });
// }
/**
 * 
 * 
 *  formateDate(dateString: any) {
    const date = new Date(dateString);

    return date.toLocaleString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: true, timeZone: 'Africa/Cairo'
    });
  }
 * 
 * 
 * */
