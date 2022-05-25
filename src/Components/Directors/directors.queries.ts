import { PrismaClient, Directors } from '@prisma/client';

type ResolverContext = {
  orm: PrismaClient;
};

export function showAllDirectors(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Directors[]> {
  return context.orm.directors.findMany();
}
export function getADirector(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
): Promise<Directors | null> {
  return context.orm.directors.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: { movies: true },
  });
}
