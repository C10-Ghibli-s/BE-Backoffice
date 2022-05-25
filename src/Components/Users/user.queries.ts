import { PrismaClient, Users } from '@prisma/client';

type ResolverContext = {
  orm: PrismaClient;
};

export function showAllUsers(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Users[]> {
  return context.orm.users.findMany();
}

export function getAnUser(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
): Promise<Users | null> {
  return context.orm.users.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: { role: true },
  });
}
