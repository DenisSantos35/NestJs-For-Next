import { Controller, Get, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomParseIntPipe } from 'src/common/pipes/custom-parse-int-pipe.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly configService: ConfigService) {}

  @Get(':id') //nomeia tipo de requisição
  //recebe parametros
  findOne(@Param('id', CustomParseIntPipe) id: number) {
    //Formas de buscar dados no .env
    console.log(process.env.TESTE || 'DEFAULT');
    console.log(this.configService.get('TESTE', 'DEFAULT'));
    console.log(this.configService.getOrThrow('TESTE1'));
    return `olá do controller do user #${id}`;
  }
}
