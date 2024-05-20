import { TransactionInfoEntity } from '../domain/entities/transaction-db.entity';
import { TransactionEntity } from '../domain/entities/transaction.entity';
import { BrokerRepository } from '../domain/repositories/broker.repository';
import { RedisRepository } from '../domain/repositories/redis.repository';
import { TransactionRepository } from '../domain/repositories/transaction.repository';
import { CreateTransactionRequest } from '../infrastructure/interface/dtos/request/create-transaction.request';
import { logger } from '../../core/utils/logger';

export class TransactionApplication {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly brokerRepository: BrokerRepository,
    private readonly redisRepository: RedisRepository,
  ) {
    this.transactionRepository = transactionRepository;
    this.brokerRepository = brokerRepository;
    this.redisRepository = redisRepository;
  }

  async registerTransaction(
    data: CreateTransactionRequest,
  ): Promise<TransactionInfoEntity> {
    const transactionValue = new TransactionEntity(data);
    const transaction = await this.transactionRepository.create(
      transactionValue,
    );
    await this.brokerRepository.send({
      transactionExternalId: transaction.transactionExternalId,
      value: transaction.value,
    });

    return new TransactionInfoEntity(transaction);
  }

  async getTransaction(id: string): Promise<TransactionInfoEntity> {
    const cachedData = <TransactionInfoEntity>(
      await this.redisRepository.get(id)
    );
    if (cachedData) {
      logger.debug('[Redis Data]', JSON.stringify(cachedData));
      return cachedData;
    }

    const result = await this.transactionRepository.find(id);
    const setRedis = await this.redisRepository.set(
      id,
      new TransactionInfoEntity(result),
    );
    logger.debug(setRedis);
    return new TransactionInfoEntity(result);
  }

  async receive(): Promise<void> {
    await this.brokerRepository.receive();
  }
}
