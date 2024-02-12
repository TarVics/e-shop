import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { MailModule } from 'src/mail/mail.module';

import { JwtConfig } from './auth.options';
import { AuthToken, AuthUser } from './entities';
import { AuthController, AuthUsersController } from './controllers';
import { AuthService, AuthUsersService } from './services';
import {
  AccessJwtStrategy,
  RecoverJwtStrategy,
  RefreshJwtStrategy,
  RegisterJwtStrategy,
} from './strategies';
import { AuthTokensSubscriber, AuthUsersSubscriber } from './subscribers';

@Module({
  imports: [
    ConfigModule.forFeature(JwtConfig),
    TypeOrmModule.forFeature([AuthToken, AuthUser]),
    PassportModule,
    MailModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController, AuthUsersController],
  providers: [
    AuthTokensSubscriber,
    AuthUsersSubscriber,
    AuthService,
    AuthUsersService,
    AccessJwtStrategy,
    RecoverJwtStrategy,
    RefreshJwtStrategy,
    RegisterJwtStrategy,
  ],
  exports: [AuthUsersService],
})
export class AuthModule {}
