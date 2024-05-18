import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CorsOptions } from 'cors';
import { EnvConfig } from '../utils/env-config';

@Injectable()
export class CorsOptionsDelegate implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const corsOptions: CorsOptions = { origin: false };

    if (EnvConfig.whiteList.includes(req.header('Origin') ?? '')) {
      corsOptions.origin = true;
    }

    res.set(corsOptions);
    next();
  }
}
