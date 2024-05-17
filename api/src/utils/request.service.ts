import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Logger } from './logger';

@Injectable()
export class RequestService {
  constructor(private logger: Logger) {}

  async Request(method: string, url: string, data = undefined) {
    try {
      this.logger.log(`Requesting ${method} ${url}`);
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
    } catch (error) {
      this.logger.error(`Error in axios request: ${error.message}`, error);
      throw error;
    }
  }
}
