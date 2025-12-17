import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthSevice } from './auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthSevice],
  exports: [],
})
export class AuthModule {}
