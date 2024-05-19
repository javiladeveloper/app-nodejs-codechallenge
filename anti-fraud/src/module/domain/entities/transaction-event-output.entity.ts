import { TransactionStatusEnum } from '../../infrastructure/dtos/enums/transaction-status.enum';

export class TransactionEventOutput {
  readonly transactionExternalId: string;
  readonly status: TransactionStatusEnum;
}
