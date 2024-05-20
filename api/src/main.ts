import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './core/utils/logger';
import { HttpErrorFilter } from './core/middleware/http-error.middleware';
import { ValidationPipe, ValidationError } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(Logger);

  // Usar el filtro de errores globalmente
  app.useGlobalFilters(new HttpErrorFilter());

  // Habilitar la validación global con mensajes de error específicos
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) => {
      console.log(errors)
      const detailedErrors = errors.map(error => {
        return {
          property: error.property,
          constraints: error.constraints,
          children: error.children
        };
      });
      return new BadRequestException({ message: 'Validation failed', errors: detailedErrors });
    }
  }));

  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    logger.log(`Server started on port ${port}`);
  });
}

bootstrap();
