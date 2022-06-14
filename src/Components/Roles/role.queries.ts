import { Roles } from '@prisma/client';
import { errorHandler } from '../../middleware';
import { ResolverContext } from '../../utils/typeContext';
import { unauthenticated, unauthorizedSuperAdmin } from '../../utils/authorization.error';
import { isRoles } from './utils/errors.roles';

export async function showAllRoles(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Roles[] | undefined> {
  unauthenticated();
  unauthorizedSuperAdmin();
  let roles: Array<Roles>;
  try {
    roles = await context.orm.roles.findMany();
    return roles;
  } catch (error) {
    errorHandler(error);
  }
}
export async function getARole(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
): Promise<Roles | null> {
  unauthenticated();
  unauthorizedSuperAdmin();
  const role = await context.orm.roles.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: { users: true },
  });
  isRoles(role, arg);
  return role;
}

