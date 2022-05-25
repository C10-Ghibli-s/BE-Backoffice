import { Interactions, PrismaClient } from '@prisma/client';

type ResolverContext = {
  orm: PrismaClient;
};

export function showAllInteractions(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Interactions[]> {
  return context.orm.interactions.findMany();
}

export function getAInteraction(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
): Promise<Interactions | null> {
  return context.orm.interactions.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: { user: true, movie: true },
  });
}
