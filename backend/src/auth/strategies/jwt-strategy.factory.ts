import { ConfigType } from '@nestjs/config';
import { Inject, Injectable, mixin, Type } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { memoize } from '@nestjs/passport/dist/utils/memoize.util';
import { Request } from 'express';

import { JwtConfig } from '../auth.options';
import { AuthUser } from '../entities';
import { TokenKind } from '../enums';
import { AuthService } from '../services';

export interface JwtPayload {
  [key: string]: any;

  iss?: string | undefined;
  sub?: string | undefined;
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  jti?: string | undefined;
}

export const JwtStrategyFactory: (type: TokenKind) => Type<Strategy> = memoize(
  createTokenStrategyFactory,
);

function createTokenStrategyFactory(kind: TokenKind): Type<Strategy> {
  @Injectable()
  class JwtStrategyMixin extends PassportStrategy(Strategy, kind) {
    constructor(
      @Inject(JwtConfig.KEY)
      private jwt: ConfigType<typeof JwtConfig>,
      private readonly authService: AuthService,
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwt.tokens[kind].secret,
        ignoreExpiration: false,
        passReqToCallback: true,
      });
    }

    validate(req: Request, payload: JwtPayload): Promise<AuthUser> {
      return this.authService.validateJwtToken(
        payload,
        kind,
        kind === TokenKind.Access
          ? ''
          : req.get('Authorization')?.slice('Bearer '.length) || '',
      );
    }

    // validate(payload: JwtPayload): Promise<AuthUser> {
    //   return this.authService.validateToken(payload, kind);
    // }
  }

  return mixin(JwtStrategyMixin);
}
