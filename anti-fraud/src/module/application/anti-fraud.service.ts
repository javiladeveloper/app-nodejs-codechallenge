import { Injectable, Inject } from '@nestjs/common';
import { BrokerRepository } from '../domain/repositories/broker.repository';

@Injectable()
export class AntiFraudService {
  constructor(
    @Inject('BrokerRepository')
    private readonly brokerRepository: BrokerRepository,
  ) {}

  async receive() {
    await this.brokerRepository.receive();
  }
}
