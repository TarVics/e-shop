import { SetMetadata } from '@nestjs/common';
import { AuthRole } from '../enums';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: AuthRole[]) => SetMetadata(ROLES_KEY, roles);
