import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
import { MulterModule } from '@nestjs/platform-express';
import { APP_FILTER } from '@nestjs/core';

import { AllExceptionsFilter } from '../core/filters';

import { appOptions } from './app.options';
import { AppLoggerMiddleware } from '../core/middleware/app-logger.middleware';

import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { MailModule } from '../mail/mail.module';
import { ProfileModule } from '../profile/profile.module';
import { RefsModule } from '../refs/refs.module';
import { ShopModule } from '../shop/shop.module';

import { AppController } from './app.controller';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot(appOptions),
    CacheModule.register({ isGlobal: true }),
    MulterModule.register(),
    ScheduleModule.forRoot(),
    DatabaseModule,
    MailModule,
    AuthModule,
    ProfileModule,
    RefsModule,
    ShopModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
