import { PrismaClient, Roles } from '@prisma/client';

type ResolverContext = {
  orm: PrismaClient;
};

export function showAllRoles(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Roles[]> {
  return context.orm.roles.findMany();
}
export function getARole(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
): Promise<Roles | null> {
  return context.orm.roles.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: { users: true },
  });
}

