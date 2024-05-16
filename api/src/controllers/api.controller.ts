import { Request, Response, NextFunction } from 'express';
import { axiosRequest } from '../libs/utils/request';
import { logger } from '../libs/utils/logger';

export async function getTransaction(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const response = await axiosRequest('GET', `https://pokeapi.co/api/v2/pokemon/${id}`);
    const result = response?.data;
    res.send(JSON.stringify(result));
  } catch (error) {
    logger.error('Error fetching transaction', error);
    next(error);
  }
}

export async function createTransaction(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await axiosRequest('GET', 'https://pokeapi.co/api/v2/pokemon/ditto', req.body);
    const result = response?.data;
    res.send(JSON.stringify(result));
  } catch (error) {
    logger.error('Error creating transaction', error);
    next(error);
  }
}
