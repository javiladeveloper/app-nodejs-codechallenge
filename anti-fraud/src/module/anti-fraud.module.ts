import { Module } from '@nestjs/common';
import { BrokerBootstrap } from '../bootstrap/broker.bootstrap';
import { AntiFraudService } from './application/anti-fraud.service';
import { BrokerController } from './infrastructure/broker.controller';
import { BrokerInfrastructure } from './infrastructure/broker.infrastructure';

@Module({
  providers: [
    BrokerBootstrap,
    AntiFraudService,
    {
      provide: 'BrokerRepository',
      useClass: BrokerInfrastructure,
    },
    BrokerInfrastructure,
  ],
  controllers: [BrokerController],
  exports: [AntiFraudService, BrokerInfrastructure],
})
export class AntiFraudModule {}
