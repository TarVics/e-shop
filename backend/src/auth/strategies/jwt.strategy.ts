import { Type } from '@nestjs/common';
import { Strategy } from 'passport-jwt';

import { TokenKind } from '../enums';
import { JwtStrategyFactory } from './jwt-strategy.factory';

export const AccessJwtStrategy: Type<Strategy> = JwtStrategyFactory(
  TokenKind.Access,
);
export const RecoverJwtStrategy: Type<Strategy> = JwtStrategyFactory(
  TokenKind.Recover,
);
export const RefreshJwtStrategy: Type<Strategy> = JwtStrategyFactory(
  TokenKind.Refresh,
);
export const RegisterJwtStrategy: Type<Strategy> = JwtStrategyFactory(
  TokenKind.Register,
);
