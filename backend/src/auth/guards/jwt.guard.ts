import { Type } from '@nestjs/common';
import { IAuthGuard } from '@nestjs/passport';

import { TokenKind } from '../enums';
import { JwtGuardFactory } from './jwt-guard.factory';

export const AccessJwtGuard: Type<IAuthGuard> = JwtGuardFactory(
  TokenKind.Access,
);
export const RecoverJwtGuard: Type<IAuthGuard> = JwtGuardFactory(
  TokenKind.Recover,
);
export const RefreshJwtGuard: Type<IAuthGuard> = JwtGuardFactory(
  TokenKind.Refresh,
);
export const RegisterJwtGuard: Type<IAuthGuard> = JwtGuardFactory(
  TokenKind.Register,
);
