import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

@Injectable()
export class Logger implements LoggerService {
  private logger = createLogger({
    format: combine(
      colorize(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      customFormat,
    ),
    transports: [new transports.Console()],
  });

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(`${message} - ${trace}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
