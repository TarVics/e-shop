import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import path from 'path';
import process from 'process';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const stack = ((exception as Error).stack || '')
      .split(path.dirname(require.main?.paths[0] || ''))
      .join('<root>')
      .split(path.dirname(require.main?.paths[1] || ''))
      .join('<root>');

    const responseBody =
      exception instanceof HttpException
        ? {
            ...(exception.getResponse() as object),
            stack: ['development', 'debug'].includes(process.env.NODE_ENV || '')
              ? stack
              : undefined,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
          }
        : {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: [(exception as Error).message],
            error: 'Internal Server Error',
            stack: ['development', 'debug'].includes(process.env.NODE_ENV || '')
              ? stack
              : undefined,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
          };

    Logger.error(responseBody);

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
