import { Body, Controller, Post } from '@nestjs/common';
import { AuthSevice } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthSevice) {}
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.loginService(loginDto);
  }
}
