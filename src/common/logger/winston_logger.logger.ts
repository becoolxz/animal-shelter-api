import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor(label: string) {
    const { combine, timestamp, printf } = winston.format;

    const myFormat = printf(({ level, message, timestamp }) => {
      return `${level} - ${timestamp} [${label}] { ${message} }`;
    });

    this.logger = winston.createLogger({
      level: 'info',
      format: combine(
        winston.format.colorize(),
        timestamp({ format: 'MM/DD/YYYY, h:mm:ss A' }),
        myFormat,
      ),
      transports: [new winston.transports.Console()],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}
