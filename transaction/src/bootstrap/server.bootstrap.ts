import http from 'http';
import { logger } from '../core/utils/logger';
import app from '../app';
import { EnvConfig } from '../core/utils/env-config';
import { Bootstrap } from './bootstrap';

export class ServerBootstrap extends Bootstrap {
  async initialize(): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      const { port } = EnvConfig;
      const server = http.createServer(app);

      server
        .listen(port)
        .on('listening', () => {
          logger.info(`🚀 Server started on port ${port}`);
          resolve(true);
        })
        .on('error', (err) => {
          logger.error('🚀 Server failed to start', err);
          reject(err);
        });
    });
  }
}
