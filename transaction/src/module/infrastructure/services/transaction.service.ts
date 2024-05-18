import { Injectable } from '@nestjs/common';
import {
  NotFound,
  UnprocessableEntity,
  InternalServerError,
} from 'http-errors';
import { Prisma, Transaction } from '@prisma/client';
import prisma from '../db/prisma';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { TransactionStatusEnum } from '../interface/dtos/enums/transaction-status.enum';
import { Logger } from '../../../core/utils/logger';

@Injectable()
export class TransactionService {
  constructor(private readonly logger: Logger) {}

  async create(data: TransactionEntity): Promise<any> {
    try {
      const result = await prisma.transaction.create({
        data: {
          ...data,
          transactionStatus: TransactionStatusEnum.PENDING,
        },
      });
      console.log(result);
      console.log('service', data);
      return data;
    } catch (error) {
      this.logger.error(error, '');
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new UnprocessableEntity(error.message);
      }
      throw new InternalServerError();
    }
  }

  async find(id: string): Promise<Transaction> {
    try {
      const result = await prisma.transaction.findUniqueOrThrow({
        where: {
          transactionExternalId: id,
        },
      });
      console.log(id);
      console.log(result);
      return result;
    } catch (error) {
      this.logger.error(error, '');
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFound(error.message);
        }

        throw new UnprocessableEntity(error.message);
      }
      throw new InternalServerError();
    }
  }

  async update(
    id: string,
    status: TransactionStatusEnum,
  ): Promise<Transaction> {
    try {
      const result = await prisma.transaction.update({
        where: {
          transactionExternalId: id,
        },
        data: {
          transactionStatus: status,
        },
      });
      console.log(id, status);

      console.log(result);
      return result;
    } catch (error) {
      this.logger.error(error, '');
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFound(error.message);
        }

        throw new UnprocessableEntity(error.message);
      }
      throw new InternalServerError();
    }
  }
}
