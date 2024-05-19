import { Injectable } from '@nestjs/common';
import { EachMessagePayload } from 'kafkajs';
import { EnvConfig } from '../../common/env-config';
import { logger } from '../../common/logger';
import { BrokerRepository } from '../domain/repositories/broker.repository';
import { TransactionEventInput } from '../domain/entities/transaction-event-input.entity';
import { TransactionEventOutput } from '../domain/entities/transaction-event-output.entity';
import { TransactionStatusEnum } from './dtos/enums/transaction-status.enum';
import { BrokerBootstrap } from '../../bootstrap/broker.bootstrap';

@Injectable()
export class BrokerInfrastructure implements BrokerRepository {
  kafkaTopicAntifraud: string;
  kafkaTopicTransac: string;

  constructor() {
    this.kafkaTopicAntifraud = EnvConfig.kafkaTopicAntifraud;
    this.kafkaTopicTransac = EnvConfig.kafkaTopicTransac;
  }

  async send(payload: TransactionEventOutput): Promise<void> {
    const messageBuffer = Buffer.from(JSON.stringify(payload));

    await BrokerBootstrap.producer.send({
      topic: this.kafkaTopicTransac,
      messages: [{ value: messageBuffer }],
    });

    logger.info(`Message sent: ${messageBuffer.toString()}`);
  }

  async receive(): Promise<void> {
    if (!BrokerBootstrap.consumer) {
      logger.error('Kafka consumer is not initialized');
      return;
    }

    await BrokerBootstrap.consumer.subscribe({
      topic: this.kafkaTopicAntifraud,
      fromBeginning: true,
    });

    await BrokerBootstrap.consumer.run({
      eachMessage: async ({
        topic,
        partition,
        message,
      }: EachMessagePayload) => {
        const inputMessage = message.value?.toString() || '';
        logger.info(
          `Message received => topic: ${topic}, partition: ${partition}, offset: ${message.offset}, value: ${inputMessage}`,
        );

        try {
          const { transactionExternalId, value } = JSON.parse(
            inputMessage,
          ) as TransactionEventInput;
          let payload: TransactionEventOutput;

          if (value > 1000) {
            payload = {
              status: TransactionStatusEnum.REJECTED,
              transactionExternalId,
            };
          } else {
            payload = {
              status: TransactionStatusEnum.APPROVED,
              transactionExternalId,
            };
          }

          await this.send(payload);
        } catch (error) {
          logger.error('Failed to process message', error);
        }
      },
    });
  }
}
