import { BadRequestException, ParseIntPipe } from '@nestjs/common';

//criação da classe para herdar parseintpipe e customizar conforme nossas necessidades

export class CustomParseIntPipe extends ParseIntPipe {
  constructor() {
    super({
      exceptionFactory: () =>
        new BadRequestException('Parâmetro precisa ser número'),
    });
  }
}
