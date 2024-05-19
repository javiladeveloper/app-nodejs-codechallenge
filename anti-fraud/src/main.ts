import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3002);
  logger.info(`🚀 Server started on port ${process.env.PORT || 3002}`);
}
bootstrap();
