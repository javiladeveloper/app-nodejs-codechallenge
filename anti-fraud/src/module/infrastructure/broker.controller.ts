import { Controller, OnModuleInit } from '@nestjs/common';
import { AntiFraudService } from '../application/anti-fraud.service';
import { logger } from '../../common/logger';

@Controller()
export class BrokerController implements OnModuleInit {
  constructor(private readonly antiFraudService: AntiFraudService) {}

  async onModuleInit() {
    await this.listen();
  }

  async listen() {
    logger.info('🧿 BrokerController initializing message reception');
    await this.antiFraudService.receive();
  }
}
