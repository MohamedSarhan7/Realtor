import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '../dtos/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentcation')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(@Body() user: RegisterDto) {
    return this.authService.register(user);
  }

  @Post('login')
  login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }
}
