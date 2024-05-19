import { format, createLogger, transports } from 'winston';
import * as path from 'path';
import { EnvConfig } from './env-config';

const { combine, timestamp, label, printf, cli, json, colorize } = format;

// Definir formato personalizado
const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

// Definir logger
export const logger = createLogger({
  level: EnvConfig.logLevel || 'info', // Nivel de log configurable
  format: combine(
    label({ label: 'Transactions Microservice' }),
    timestamp(),
    colorize(), // Colorear los logs en la consola
    customFormat,
  ),
  transports: [
    new transports.Console({
      format: combine(cli(), customFormat),
    }),
    new transports.File({
      filename: path.join(__dirname, '../../logs/error.log'),
      level: 'error',
      format: combine(json()),
    }),
    new transports.File({
      filename: path.join(__dirname, '../../logs/combined.log'),
      format: combine(json()),
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: path.join(__dirname, '../../logs/exceptions.log'),
    }),
  ],
});

// Si estamos en producción, eliminar los logs de consola
if (EnvConfig.environment === 'production') {
  logger.remove(new transports.Console());
}
