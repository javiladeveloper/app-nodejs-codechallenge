import { LoggerService } from '@nestjs/common';
export declare class Logger implements LoggerService {
  private logger;
  log(message: string): void;
  error(message: string, trace: string): void;
  warn(message: string): void;
  debug(message: string): void;
  verbose(message: string): void;
}
