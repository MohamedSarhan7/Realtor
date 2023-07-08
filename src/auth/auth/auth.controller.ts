import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from '../dtos/login.dto';

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
