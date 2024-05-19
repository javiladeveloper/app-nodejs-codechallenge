import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { EnvConfig } from '../utils/env-config';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const whitelist = EnvConfig.whiteList;
    const origin = req.headers.origin as string;

    if (whitelist.includes('*')) {
      res.header('Access-Control-Allow-Origin', '*');
    } else if (origin && whitelist.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    } else {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE',
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );

    next();
  }
}
