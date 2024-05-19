import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { Kafka, Producer, Consumer } from 'kafkajs';
import { EnvConfig } from '../common/env-config';
import { logger } from '../common/logger';
import { Bootstrap } from './bootstrap.interface';
import { BrokerInfrastructure } from '../module/infrastructure/broker.infrastructure';

@Injectable()
export class BrokerBootstrap implements Bootstrap, OnModuleInit {
  static producer: Producer;
  static consumer: Consumer;

  private consumerInitialized: Promise<boolean | Error>;

  constructor(
    @Inject(BrokerInfrastructure)
    private readonly brokerInfrastructure: BrokerInfrastructure,
  ) {
    this.consumerInitialized = this.initialize();
  }

  async onModuleInit() {
    const initialized = await this.consumerInitialized;
    if (initialized === true) {
      await this.brokerInfrastructure.receive();
    } else {
      logger.error('Failed to initialize Kafka consumer');
    }
  }

  async initialize(): Promise<boolean | Error> {
    try {
      const { kafkaHost, kafkaClientId, kafkaGroupId } = EnvConfig;
      logger.info(
        `Connecting to Kafka: ${kafkaHost}, Client ID: ${kafkaClientId}, Group ID: ${kafkaGroupId}`,
      );

      const kafka = new Kafka({
        clientId: kafkaClientId,
        brokers: [kafkaHost],
      });

      BrokerBootstrap.producer = kafka.producer();
      BrokerBootstrap.consumer = kafka.consumer({ groupId: kafkaGroupId });

      await BrokerBootstrap.producer.connect();
      logger.info('Producer connected successfully');

      await BrokerBootstrap.consumer.connect();
      logger.info('Consumer connected successfully');

      return true;
    } catch (error) {
      logger.error('Broker failed to connect', error);
      return error;
    }
  }
}
