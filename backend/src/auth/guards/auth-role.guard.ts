import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IS_PUBLIC_KEY, ROLES_KEY } from '../decorators';
import { AuthRole } from '../enums';
import { AuthUser } from '../entities';

const RoleValue: Record<AuthRole, number> = {
  [AuthRole.User]: 0,
  [AuthRole.Operator]: 1,
  [AuthRole.Admin]: 2,
  [AuthRole.SuperAdmin]: 3,
};

@Injectable()
export class AuthRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // const targets: (Type | Function)[] = [
    const targets = [context.getHandler(), context.getClass()];

    const requiredRoles: AuthRole[] = this.reflector.getAllAndOverride<
      AuthRole[]
    >(ROLES_KEY, targets);

    if (!requiredRoles || !requiredRoles.length) return true;

    const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      targets,
    );

    if (isPublic) return true;

    const { user } = context.switchToHttp().getRequest();

    let maxValue = 0;
    requiredRoles.forEach((role): void => {
      const value = RoleValue[role];
      if (maxValue < value) maxValue = value;
    });

    return user && RoleValue[(user as AuthUser).role] >= maxValue;
  }
}
