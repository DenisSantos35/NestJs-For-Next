import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthSevice {
  loginService(loginDto: LoginDto) {
    return loginDto;
  }
}
