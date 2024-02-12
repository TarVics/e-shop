import { ConfigObject, registerAs } from '@nestjs/config';

import { validateObject } from '../core/utils';
import { AuthVariables } from './auth.validate';
import { TokenKind } from './enums';

export type TokenConfig = {
  secret: string;
  expire: string;
};

export type AuthConfig = {
  tokens: Record<TokenKind, TokenConfig>;
} & ConfigObject;

export function authFactory(config: ConfigObject): AuthConfig {
  validateObject(config, AuthVariables);

  return {
    tokens: {
      [TokenKind.Access]: {
        secret: config.JWT_ACCESS_SECRET,
        expire: config.JWT_ACCESS_EXPIRE,
      },
      [TokenKind.Refresh]: {
        secret: config.JWT_REFRESH_SECRET,
        expire: config.JWT_REFRESH_EXPIRE,
      },
      [TokenKind.Register]: {
        secret: config.JWT_REGISTER_SECRET,
        expire: config.JWT_REGISTER_EXPIRE,
      },
      [TokenKind.Recover]: {
        secret: config.JWT_RECOVER_SECRET,
        expire: config.JWT_RECOVER_EXPIRE,
      },
    },

    // accessSecret: config.JWT_ACCESS_SECRET,
    // accessExpire: config.JWT_ACCESS_EXPIRE,
    // refreshSecret: config.JWT_REFRESH_SECRET,
    // refreshExpire: config.JWT_REFRESH_EXPIRE,
    // registerSecret: config.JWT_REGISTER_SECRET,
    // registerExpire: config.JWT_REGISTER_EXPIRE,
    // recoverSecret: config.JWT_RECOVER_SECRET,
    // recoverExpire: config.JWT_RECOVER_EXPIRE,

    removeExpire: config.JWT_REMOVE_EXPIRE,
  };
}

export const JwtConfig = registerAs('jwt', () => authFactory(process.env));
