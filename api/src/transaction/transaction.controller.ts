import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './transaction.model';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stringify = require('json-stringify-safe');

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const transaction =
      await this.transactionService.createTransaction(createTransactionDto);
    return JSON.parse(stringify(transaction));
  }

  @Get(':id')
  async getTransaction(@Param('id') id: string): Promise<Transaction> {
    const transaction = await this.transactionService.getTransaction(id);
    return JSON.parse(stringify(transaction));
  }
}
