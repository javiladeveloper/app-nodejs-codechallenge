import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './utils/logger';
import { HttpErrorFilter } from './middleware/http-error.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(Logger);

  // Usar el filtro de errores globalmente
  app.useGlobalFilters(new HttpErrorFilter());

  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    logger.log(`Server started on port ${port}`);
  });
}

bootstrap();
