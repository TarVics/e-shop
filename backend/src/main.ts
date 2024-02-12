import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';

import { AppModule } from './app/app.module';
import { createLogger, padString, setupSwagger } from './core/utils';

function header(message = '') {
  Logger.log(padString(45, message), 'Bootstrap');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: createLogger(
      String(process.env.BACKEND_NAME),
      String(process.env.LOG_PATH),
      { level: process.env.LOG_LEVEL },
    ),
  });

  app.setGlobalPrefix(/*"api/v1"*/ 'v1');

  const configService = app.get(ConfigService);
  const appName = String(configService.get<string>('app.name'));

  if (configService.get('app.NODE_ENV') === 'development') {
    setupSwagger(app, {
      title: appName,
      description: `${appName} API description`,
      version: '1.0',
      tag: appName,
    });
  }

  // app.useLogger(createLogger(configService.get("app.name"), configService.get('app.logPath')))

  app.enableCors({
    origin: configService.get<string>('cors.origin'),
    credentials: configService.get<boolean>('cors.credentials'),
  });

  const port = Number(configService.get<number>('app.port'));
  const host = String(configService.get<string>('app.host'));

  app.useGlobalPipes(
    new ValidationPipe({
      // Disable detailed errors
      disableErrorMessages: false,

      // any property not included in the whitelist (DTO) is automatically
      // stripped from the resulting object
      // When set to true, this will automatically remove non-whitelisted
      // properties (those without any decorator in the validation class).
      whitelist: true,

      // stop the request from processing when non-whitelisted properties are
      // present, and return an error response to the user.
      // To enable this, set the forbidNonWhitelisted option property to true,
      // in combination with setting whitelist to true
      forbidNonWhitelisted: true,

      // automatically transform payloads to be objects typed according to
      // their DTO classes. This can be done at a method level:
      // @UsePipes(new ValidationPipe({ transform: true }))
      // Will also perform conversion of primitive types
      transform: true,
    }),
  );

  // app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(port, host);

  header();
  header('ENV: ' + configService.get('app.NODE_ENV'));
  header(configService.get('app.greeting'));
  header(`Listening at ${host}:${port}`);
  header();
}

bootstrap().then();
