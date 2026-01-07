import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  // Decorator para validar email do pacote  class-validator
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;
  // Decorator para validar verificar se é string e não está vazio
  @IsString({ message: 'Senha precisa ser uma string' })
  @IsNotEmpty({ message: 'Senha não pode estar vazia' })
  password: string;
}
