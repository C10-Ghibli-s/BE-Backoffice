import { PrismaClient, Titles } from '@prisma/client';

type ResolverContext = {
  orm: PrismaClient;
};

export function showAllTitles(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Titles[]> {
  return context.orm.titles.findMany({
    include: { movie: true },
  });
}
export function getATitle(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
): Promise<Titles | null> {
  return context.orm.titles.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: { movie: true },
  });
}

