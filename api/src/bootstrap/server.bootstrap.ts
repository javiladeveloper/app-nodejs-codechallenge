import http from 'http';
import app from '../app';
import { EnvConfig } from '../libs/utils/env-config';
import { Bootstrap } from './bootstrap';
import { logger } from '../libs/utils/logger';

export default class ServerBootstrap extends Bootstrap {
  initialize(): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      const { port } = EnvConfig;
      const server = http.createServer(app);
      server
        .listen(port)
        .on('listening', () => {
          logger.info(`Server started on port ${port}`);
          resolve(true);
        })
        .on('error', (err) => {
          logger.error('Error starting server', err);
          reject(err);
        });
    });
  }
}
