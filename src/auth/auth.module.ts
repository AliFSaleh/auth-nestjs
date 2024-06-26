import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { JWTStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({ 
      secret: authConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy]
})
export class AuthModule {}
