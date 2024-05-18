import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TransactionModule } from './module/transaction.module';
import { LoggerModule } from './core/utils/logger.module';
import { CorsOptionsDelegate } from './core/middlewares/cors.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TransactionModule,
    LoggerModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsOptionsDelegate).forRoutes('*');
  }
}
