import { Module } from '@nestjs/common';
import { TransactionApplication } from './application/transaction.application';
import { TransactionController } from './infrastructure/interface/controller/transaction.controller';
import { TransactionInfrastructure } from './infrastructure/transaction.infrastructure';
import { TransactionService } from './infrastructure/services/transaction.service';
import { LoggerModule } from '../core/utils/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [TransactionController],
  providers: [
    TransactionApplication,
    TransactionInfrastructure,
    TransactionService,
    {
      provide: 'TransactionRepository',
      useClass: TransactionInfrastructure,
    },
  ],
  exports: ['TransactionRepository'],
})
export class TransactionModule {}
