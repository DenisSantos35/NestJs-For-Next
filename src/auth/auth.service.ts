import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthSevice {
  loginService() {
    return 'Ola do AuthService';
  }
}
