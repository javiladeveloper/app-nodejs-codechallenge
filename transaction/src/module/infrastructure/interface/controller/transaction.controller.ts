import { Controller, Get, Param, Post, Body, UseFilters } from '@nestjs/common';
import { TransactionApplication } from '../../../application/transaction.application';
import { CreateTransactionRequest } from '../dtos/request/create-transaction.request';
import { TransactionResponse } from '../dtos/response/transaction.response';
import { plainToInstance } from 'class-transformer';
import { HttpExceptionFilter } from '../../../../core/middlewares/http-error.filter';

@Controller('transactions')
@UseFilters(HttpExceptionFilter)
export class TransactionController {
  constructor(
    private readonly transactionApplication: TransactionApplication,
  ) {}

  @Get(':id')
  async getTransaction(@Param('id') id: string): Promise<TransactionResponse> {
    console.log('controller', id);
    const transaction = await this.transactionApplication.getTransaction(id);
    return plainToInstance(TransactionResponse, transaction);
  }

  @Post()
  async createTransaction(
    @Body() createTransactionRequest: any,
  ): Promise<TransactionResponse> {
    console.log('controller', createTransactionRequest);
    const request = plainToInstance(
      CreateTransactionRequest,
      createTransactionRequest,
    );
    await request.isValid();
    const transaction =
      await this.transactionApplication.registerTransaction(request);

    console.log('controller2', transaction);
    return plainToInstance(TransactionResponse, transaction);
  }
}
