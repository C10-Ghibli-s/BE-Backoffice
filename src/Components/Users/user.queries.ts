import { PrismaClient, Users } from '@prisma/client';

type ResolverContext = {
  orm: PrismaClient
}

export function showAllUsers(parent: unknown, arg: unknown, context: ResolverContext): Promise<Users[]> {
  return context.orm.users.findMany({
    include: { role: true },
  });
}
