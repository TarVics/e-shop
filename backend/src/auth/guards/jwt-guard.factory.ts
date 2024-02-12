import { Inject, Injectable, mixin, Type } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { memoize } from '@nestjs/passport/dist/utils/memoize.util';
import { CanActivate } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';
import { Observable } from 'rxjs';

import { TokenKind } from '../enums';
import { IS_PUBLIC_KEY } from '../decorators';

export const JwtGuardFactory: (type: TokenKind) => Type<IAuthGuard> = memoize(
  createTokenGuardFactory,
);

function createTokenGuardFactory(kind: TokenKind): Type<CanActivate> {
  @Injectable()
  class TokenGuardMixin extends AuthGuard(kind) {
    @Inject(Reflector)
    private reflector: Reflector;

    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );
      return isPublic || super.canActivate(context);
    }
  }

  return mixin(TokenGuardMixin);
}
