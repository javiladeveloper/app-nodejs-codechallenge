import ServerBootstrap from './bootstrap/server.bootstrap';
import { logger } from './libs/utils/logger';

(async () => {
  try {
    const serverBootstrap = new ServerBootstrap();
    await serverBootstrap.initialize();
    logger.info('Server started successfully');
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
})();
