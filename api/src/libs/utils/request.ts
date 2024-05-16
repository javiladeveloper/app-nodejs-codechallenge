import axios from 'axios';
import { logger } from './logger';

export async function axiosRequest(method: string, url: string, data = undefined) {
  try {
    logger.info(`Requesting ${method} ${url}`);
    const response = await axios({
      method,
      url,
      data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error: any) {
    logger.error(`Error in axios request: ${error.message}`);
    throw error;
  }
}