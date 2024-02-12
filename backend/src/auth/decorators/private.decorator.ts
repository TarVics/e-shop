import { applyDecorators, SetMetadata, Type, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AccessJwtGuard, AuthRoleGuard } from '../guards';
import { AuthRole } from '../enums';
import { IAuthGuard } from '@nestjs/passport';
import { CanActivate } from '@nestjs/common/interfaces';

export function Private(...roles: AuthRole[]) {
  const type: AuthRole = roles.length ? roles[0] : AuthRole.User;
  const roleName: string =
    type === AuthRole.SuperAdmin
      ? 'Super Admin'
      : type === AuthRole.Admin
      ? 'Admin'
      : type === AuthRole.Operator
      ? 'Operator'
      : 'User';

  return applyDecorators(
    ApiHeader({
      name: 'Authorization',
      description: `Bearer JWT access ${roleName} token`,
    }),
    SetMetadata('roles', roles),
    UseGuards(AccessJwtGuard, AuthRoleGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

// export function PrivateBy(guard: CanActivate | Function, ...roles: AuthRole[]) {
export function PrivateBy(
  guard: CanActivate | Type<IAuthGuard>,
  ...roles: AuthRole[]
) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(guard, AuthRoleGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
