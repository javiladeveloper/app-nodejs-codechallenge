import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/middlewares/http-error.filter';
import { Logger } from './core/utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(Logger);

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3001, () => {
    logger.log('Server is running on http://localhost:3001');
  });
}

bootstrap();
