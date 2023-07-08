import { UserType } from '@prisma/client';

export interface UserInfoAuth {
  name: string;
  id: number;
  email: string;
  iat: number;
  exp: number;
}
export interface registerParams {
  email: string;
  password: string;
  name: string;
  user_type?: UserType;
}

export interface loginParams {
  email: string;
  password: string;
}
