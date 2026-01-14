import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { HashingService } from 'src/common/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt-payload.types';

@Injectable()
export class AuthSevice {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}
  async loginService(loginDto: LoginDto) {
    // buscar o email e verificar se nao esta vazio
    // Para Checar email
    //E-mail -> pode ser checado no Repositório | UserService <- importação necessária UserModule
    const user = await this.userService.findByEmail(loginDto.email);
    const error = new UnauthorizedException('Usuário ou senha inválidos');
    if (!user) {
      throw error;
    }
    // Comparar senha com hash -> É necessário o HashingService <- importação necessária CommonModule
    const isPasswordValid = await this.hashingService.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw error;
    }

    // Assinar -> É necessáriio JwtService <- importação necessária JwtModule
    const JwtPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };
    const accessToken = await this.jwtService.signAsync(JwtPayload);

    user.forceLogout = false;
    await this.userService.save(user);
    return { accessToken };
  }
}
