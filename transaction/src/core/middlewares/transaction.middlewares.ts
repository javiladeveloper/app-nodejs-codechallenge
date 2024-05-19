import { plainToInstance } from 'class-transformer';
import { HttpError } from 'http-errors';
import { CorsOptions } from 'cors';
import { NextFunction, Request, Response } from 'express';
import { HttpErrorDto } from '../dtos/exceptions/http-error.exception.dto';
import { logger } from '../utils/logger';
import { EnvConfig } from '../utils/env-config';

export function httpErrorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (EnvConfig.environment !== 'development') {
    logger.error(`Error: ${err.message}`, {
      stack: err.stack,
      path: req.path,
      method: req.method,
      status: err.status,
    });
  }

  const status = err.status ?? 500;
  const errorResponse = plainToInstance(HttpErrorDto, err);

  res.status(status).json(errorResponse);
}

export const corsOptionsDelegate = (
  req: Request,
  callback: (err: Error | null, options?: CorsOptions) => void,
): void => {
  const origin = req.header('Origin') ?? '';
  const corsOptions: CorsOptions = {
    origin: EnvConfig.whiteList.includes(origin),
  };

  callback(null, corsOptions);
};
