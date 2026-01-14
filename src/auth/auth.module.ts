import { InternalServerErrorException, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthSevice } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { CommonModule } from 'src/common/commom.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    CommonModule,
    JwtModule.registerAsync({
      useFactory: () => {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
          throw new InternalServerErrorException(
            'JWT_SECRET not found in .env',
          );
        }

        return {
          secret,
          signOptions: {
            expiresIn: Number(process.env.JWT_EXPIRATION) || '1d',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthSevice],
  exports: [],
})
export class AuthModule {}
