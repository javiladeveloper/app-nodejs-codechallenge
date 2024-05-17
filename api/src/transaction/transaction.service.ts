import { Injectable } from '@nestjs/common';
import { RequestService } from '../utils/request.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './transaction.model';
import { Logger } from '../utils/logger';

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
      'GET',
      'https://pokeapi.co/api/v2/pokemon/ditto',
      createTransactionDto,
    );
    this.logger.log('Transaction created successfully');
    return response.data;
  }

  async getTransaction(id: string): Promise<any> {
    const response = await this.requestService.Request(
      'GET',
      'https://pokeapi.co/api/v2/pokemon/ditto',
    );
    this.logger.log(`Transaction with id ${id} retrieved successfully`);
    return response.data;
  }
}
