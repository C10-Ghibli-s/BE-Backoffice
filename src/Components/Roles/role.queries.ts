import { PrismaClient, Roles } from '@prisma/client';
import { errorHandler } from '../../middleware';

type ResolverContext = {
  orm: PrismaClient;
};

export async function showAllRoles(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Roles[] | undefined> {
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
  const role = await context.orm.roles.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: { users: true },
  });
  if (!role) {
    throw new Error(`The Role with id ${arg.id}, does not exist.`);
  }
  return role;
}

