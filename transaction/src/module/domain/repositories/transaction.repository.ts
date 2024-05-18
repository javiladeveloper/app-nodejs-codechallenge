import { TransactionEntity } from '../entities/transaction.entity';

export interface TransactionRepository {
  create(data: TransactionEntity): Promise<any>;
  find(id: string): Promise<any>;
  updateStatus(id: string, status: string): Promise<any>;
}
