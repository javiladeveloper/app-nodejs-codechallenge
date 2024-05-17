export class Transaction {
  transactionExternalId: string;
  accountExternalIdDebit: string;
  accountExternalIdCredit: string;
  transferTypeId: number;
  value: number;
  transactionStatus: string;
  createdAt: Date;
}
