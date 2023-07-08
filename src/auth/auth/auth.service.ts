import { BadRequestException, Injectable } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { UserResponseDto } from '../dtos/userrespone.dto';
interface registerParams {
  email: string;
  password: string;
  name: string;
  user_type?: UserType;
}

interface loginParams {
  email: string;
  password: string;
}
@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async register(user: registerParams): Promise<UserResponseDto> {
    const userExists = await this.prismaService.user.findUnique({
      where: { email: user.email },
    });
    if (userExists) throw new BadRequestException('email already exists!!');
    const hashedPaswword = await bcrypt.hash(user.password, 10);
    const newUser = await this.prismaService.user.create({
      data: {
        ...user,
        password: hashedPaswword,
      },
    });
    const token = this.genrateJwtToken(newUser.id, newUser.email, newUser.name);

    return new UserResponseDto({
      ...newUser,
      token: { key: token, expiresIn: process.env.JWT_EXPIRES_IN },
    });
  }

  async login(body: loginParams): Promise<UserResponseDto> {
    const user = await this.prismaService.user.findUnique({
      where: { email: body.email },
    });
    if (!user) throw new BadRequestException('Invalid cerdintioals!');
    const isValidPassword = await bcrypt.compare(body.password, user.password);
    if (!isValidPassword)
      throw new BadRequestException('Invalid cerdintioals!');
    const token = this.genrateJwtToken(user.id, user.email, user.name);
    return new UserResponseDto({
      ...user,
      token: { key: token, expiresIn: process.env.JWT_EXPIRES_IN },
    });
  }

  private genrateJwtToken(id: number, email: string, name: string) {
    return jwt.sign(
      {
        id,
        name,
        email,
      },
      process.env.JWT_TOKEN_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
  }
}