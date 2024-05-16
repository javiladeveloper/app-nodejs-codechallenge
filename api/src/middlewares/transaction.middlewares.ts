
import { plainToInstance } from 'class-transformer'
import { CorsOptions } from 'cors'
import { NextFunction, Request, Response } from 'express'
import { HttpErrorDto } from '../libs/dtos/http-error.exception.dto'
import { EnvConfig } from '../libs/utils/env-config'

export function httpErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  res.status(err?.status ?? 500)
  res.json(plainToInstance(HttpErrorDto, err))
}

export const corsOptions = function handler(
  req: Request,
  callback: (err: Error | null, options?: CorsOptions) => void,
) {
  const corsOptions: { origin: boolean } = { origin: false }

  if (EnvConfig.whiteList.indexOf(req.header('Origin') ?? '') !== -1) {
    corsOptions.origin = true
  }

  callback(null, corsOptions)
}
