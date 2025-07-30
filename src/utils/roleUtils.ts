import { Role } from '../entities/Role';

export function canAccess(role: Role, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(role);
}
