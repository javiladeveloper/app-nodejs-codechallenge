import { BrokerBootstrap } from './bootstrap/broker.bootstrap';
import { ServerBootstrap } from './bootstrap/server.bootstrap';
import { logger } from './core/utils/logger';
import { TransactionApplication } from './transaction/application/transaction.application';
import { BrokerInfrastructure } from './transaction/infrastructure/broker.infrastructure';
import BrokerController from './transaction/infrastructure/interface/broker/broker.controller';
import { RedisInfrastructure } from './transaction/infrastructure/redis.infrastructure';
import { TransactionInfrastructure } from './transaction/infrastructure/transaction.infrastructure';

const initializeServices = async () => {
  const server = new ServerBootstrap();
  const broker = new BrokerBootstrap();

  const transactionInfrastructure = new TransactionInfrastructure();
  const brokerInfrastructure = new BrokerInfrastructure();
  const redisInfrastructure = new RedisInfrastructure();
  const transactionApplication = new TransactionApplication(
    transactionInfrastructure,
    brokerInfrastructure,
    redisInfrastructure,
  );

  const brokerController = new BrokerController(transactionApplication);

  try {
    await Promise.all([server.initialize(), broker.initialize()]);
    await brokerController.listen();
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

initializeServices();
