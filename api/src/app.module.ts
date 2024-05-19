import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TransactionModule } from './transaction/transaction.module';
import { LoggerModule } from './core/utils/logger.module';
import { CorsMiddleware } from './core/middleware/cors.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TransactionModule,
    LoggerModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
