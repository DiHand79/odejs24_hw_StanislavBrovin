import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategy';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { UsersModule } from 'src/users/users.module';
// https://docs.nestjs.com/cli/usages
// https://docs.nestjs.com/recipes/passport
// https://docs.nestjs.com/security/authentication

@Module({
  imports: [UsersModule, JwtModule.register({}), ConfigModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    UsersService,
  ],
})
export class AuthModule {}
