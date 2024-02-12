import { LoggerService } from '@nestjs/common/services/logger.service';
import { WinstonModule } from 'nest-winston';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import Transport from 'winston-transport';

import nestLikeConsoleFormat from './nest-like-console-format.function';
import { resolve } from 'node:path';

export enum LogLevel {
  error = 'error',
  warn = 'warn',
  info = 'info',
  debug = 'debug',
  verbose = 'verbose',
}

type FileLoggerOptions = Omit<
  DailyRotateFile.DailyRotateFileTransportOptions,
  'filename' | 'stream' | 'handleExceptions' | 'json'
>;

const logFormat = winston.format.printf(
  ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`,
);

export function createLogger(
  appName: string,
  dirname: string,
  options: FileLoggerOptions = {},
): LoggerService {
  const { level = LogLevel.debug, ...logOptions } = options;

  const consoleTransport = () =>
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.ms(),
        winston.format.timestamp({ format: 'YYYY-MM-DD, HH:mm:ss' }),
        nestLikeConsoleFormat(appName),
      ),
    });

  const debugTransport = () =>
    // debug log setting
    new DailyRotateFile({
      datePattern: 'YYYY-MM-DD',
      dirname: resolve(process.cwd(), dirname, level), // log file /logs/debug/*.log in save
      filename: `%DATE%.log`,
      json: false,
      level,
      maxFiles: '30d', // 30 Days saved
      maxSize: '20m',
      zippedArchive: true,
      ...logOptions,
    });

  const errorTransport = () =>
    // error log setting
    new DailyRotateFile({
      datePattern: 'YYYY-MM-DD',
      dirname: resolve(process.cwd(), dirname, LogLevel.error), // log file /logs/error/*.log in save
      filename: `%DATE%.log`,
      handleExceptions: true,
      json: false,
      level: LogLevel.error,
      maxFiles: '30d', // 30 Days saved
      maxSize: '20m',
      zippedArchive: true,
      ...logOptions,
    });

  const transports: Transport[] =
    level === LogLevel.error
      ? [consoleTransport(), errorTransport()]
      : [consoleTransport(), debugTransport(), errorTransport()];

  return WinstonModule.createLogger({
    level: LogLevel.info,

    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      logFormat,
    ),

    transports,
  });
}
