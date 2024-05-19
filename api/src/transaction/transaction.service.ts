import { Injectable } from '@nestjs/common';
import { RequestService } from '../core/utils/request.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './transaction.model';
import { Logger } from '../core/utils/logger';
import { EnvConfig } from '../core/utils/env-config';

@Injectable()
export class TransactionService {
  private transactions: Transaction[] = [];

  constructor(
    private requestService: RequestService,
    private logger: Logger,
  ) {}

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<any> {
    const response = await this.requestService.Request(
      'POST',
      `${EnvConfig.pathTransactions}/transaction`,
      createTransactionDto,
    );
    this.logger.log('Transaction created successfully');
    return response?.data?.transaction;
  }

  async getTransaction(id: string): Promise<any> {
    const response = await this.requestService.Request(
      'GET',
      `${EnvConfig.pathTransactions}/transaction/${id}`,
    );
    this.logger.log(`Transaction with id ${id} retrieved successfully`);
    return response?.data?.transaction;
  }
}
