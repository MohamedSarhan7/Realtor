import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { UserType } from '@prisma/client';

interface JWTPayload {
  name: string;
  id: number;
  eamil: string;
  user_type: UserType;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthGurd implements CanActivate {
  constructor(private readonly reflctor: Reflector) {}
  async canActivate(context: ExecutionContext) {
    // get user from token
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split('Bearer ')[1];
    const user = (await jwt.verify(
      token,
      process.env.JWT_TOKEN_KEY,
    )) as JWTPayload;

    if (!user) throw new UnauthorizedException();

    // add decoded user to request
    request.user = user;

    // get roles
    const roles = this.reflctor.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) return true;

    // match user.user_type with roles if roles exist
    return roles.includes(user.user_type);
  }
}
