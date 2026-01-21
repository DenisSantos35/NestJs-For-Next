import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomParseIntPipe } from 'src/common/pipes/custom-parse-int-pipe.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.gard';
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}
  // useguards verifica a estrategia e barra usuários sem altorização acessar a rota que estiver decorada com ele.
  @UseGuards(JwtAuthGuard)
  @Get(':id') //nomeia tipo de requisição
  //recebe parametros
  findOne(
    @Req() req: AuthenticatedRequest,
    @Param('id', CustomParseIntPipe) id: number,
  ) {
    console.log(req.user.id);
    console.log(req.user.email);
    return `olá do controller do user #${id}`;
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    return new UserResponseDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async update(@Req() req: AuthenticatedRequest, @Body() dto: UpdateUserDto) {
    const id = req.user.id;
    const user = await this.userService.update(id, dto);
    return new UserResponseDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/password')
  async updatePasword(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdatePasswordDto,
  ) {
    const user = await this.userService.updatePassword(req.user.id, dto);
    return new UserResponseDto(user);
  }
}
