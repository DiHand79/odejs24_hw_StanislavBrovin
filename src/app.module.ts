import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { LogIpMiddleware } from './middleware/log-ip.middleware';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
  imports: [UsersModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogIpMiddleware)
      .forRoutes({ path: '/', method: RequestMethod.ALL });
  }
}
