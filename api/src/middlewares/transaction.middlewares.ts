import { plainToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import { HttpErrorDto } from '../libs/dtos/http-error.exception.dto';

export function httpErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const status = err.status || 500;
  const errorResponse = plainToInstance(HttpErrorDto, {
    message: err.message || 'Internal Server Error',
    statusCode: status,
    errors: err.errors || [],
  });

  res.status(status).json(errorResponse);
}
