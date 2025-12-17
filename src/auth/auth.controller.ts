import { Controller, Post } from '@nestjs/common';
import { AuthSevice } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthSevice) {}
  @Post('login')
  loginController() {
    return this.authService.loginService();
  }
}
