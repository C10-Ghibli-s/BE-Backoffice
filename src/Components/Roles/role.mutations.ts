import { Roles } from '@prisma/client';
import { errorHandler } from '../../middleware';
import { ResolverContext } from '../../utils/typeContext';
import { unauthenticated, unauthorizedSuper, unauthorizedSuperAdmin } from '../../utils/authorization.error';
import { isRoles } from './utils/errors.roles';

export async function createRole(
  parent: unknown,
  { data }: { data: Pick<Roles, 'name' | 'status'> },
  context: ResolverContext
): Promise<Roles | undefined> {
  unauthenticated();
  unauthorizedSuperAdmin();
  try {
    const role = await context.orm.roles.create({
      data,
    });
    return role;
  } catch (error) {
    errorHandler(error);
  }
}

export async function updateRole(
  parent: unknown,
  arg: { id: string; data: { data: Pick<Roles, 'name' | 'status'> } },
  context: ResolverContext
): Promise<Roles> {
  unauthenticated();
  unauthorizedSuperAdmin();
  const role = await context.orm.roles.findUnique({
    where: { id: parseInt(arg.id, 10) }
  });
  isRoles(role, arg);
  return context.orm.roles.update({
    where: { id: parseInt(arg.id, 10) },
    data: arg.data,
  });
}

export async function deleteRole(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
) {
  unauthenticated();
  unauthorizedSuper();
  const role = await context.orm.roles.findUnique({
    where: { id: parseInt(arg.id, 10) }
  });
  isRoles(role, arg);
  await context.orm.roles.delete({
    where: { id: parseInt(arg.id, 10) },
  });
  return `The Role with ${arg.id} Id was deleted`;
}
