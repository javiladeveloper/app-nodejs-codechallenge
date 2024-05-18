import { Injectable } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { TransactionRepository } from '../domain/repositories/transaction.repository';
import { TransactionEntity } from '../domain/entities/transaction.entity';
import { TransactionService } from './services/transaction.service';
import { TransactionStatusEnum } from './interface/dtos/enums/transaction-status.enum';

@Injectable()
export class TransactionInfrastructure implements TransactionRepository {
  constructor(private readonly transactionService: TransactionService) {}

  async create(data: TransactionEntity): Promise<Transaction> {
    console.log('infraestructure', data);

    return this.transactionService.create(data);
  }

  async find(id: string): Promise<Transaction> {
    console.log('infraestructure', id);

    return this.transactionService.find(id);
  }

  async updateStatus(id: string, status: TransactionStatusEnum): Promise<any> {
    return this.transactionService.update(id, status);
  }
}
