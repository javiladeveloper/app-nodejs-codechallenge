import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { RequestService } from '../utils/request.service';
import { LoggerModule } from '../utils/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [TransactionService, RequestService],
  controllers: [TransactionController],
})
export class TransactionModule {}
