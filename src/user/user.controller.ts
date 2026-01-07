import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get(':id') //nomeia tipo de requisição
  //recebe parametros
  findOne(@Param('id') id: string) {
    return `olá do controller do user #${id}`;
  }
}
