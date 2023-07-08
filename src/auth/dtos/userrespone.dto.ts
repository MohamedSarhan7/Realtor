import { UserType } from '@prisma/client';
import { Exclude } from 'class-transformer';

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
