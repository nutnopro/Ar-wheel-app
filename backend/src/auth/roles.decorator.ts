// src/auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export type AppRole = 'visitor' | 'user' | 'store' | 'admin';

export const Roles = (...roles: AppRole[]) => SetMetadata(ROLES_KEY, roles);