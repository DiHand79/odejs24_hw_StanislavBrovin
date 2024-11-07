import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { LogIpMiddleware } from './middleware/log-ip.middleware';
import { UsersModule } from './users/users.module';
// import { AuthController } from './auth/auth.controller';
// import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  // imports: [UsersModule, AuthModule],
  // controllers: [AppController, AuthController],
  // providers: [AppService, AuthService],
  imports: [UsersModule, AuthModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogIpMiddleware)
      .forRoutes({ path: '/', method: RequestMethod.ALL });
  }
}
