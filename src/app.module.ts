import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
// import { LogIpMiddleware } from './logger/logger.middleware';
import { LogIpMiddleware } from './middleware/log-ip.middleware';

@Module({
  imports: [LoggerModule],
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
