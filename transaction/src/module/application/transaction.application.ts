import { Injectable, Inject } from '@nestjs/common';
import { TransactionRepository } from '../domain/repositories/transaction.repository';
import { TransactionEntity } from '../domain/entities/transaction.entity';
import { CreateTransactionRequest } from '../infrastructure/interface/dtos/request/create-transaction.request';

@Injectable()
export class TransactionApplication {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async registerTransaction(data: CreateTransactionRequest): Promise<any> {
    const transactionValue = new TransactionEntity(data);
    console.log('application', transactionValue);

    const transaction =
      await this.transactionRepository.create(transactionValue);

    console.log('application2', transaction);
    return transaction;
  }

  async getTransaction(id: string): Promise<any> {
    console.log('application', id);

    console.log(id);
    return id;
  }
}
