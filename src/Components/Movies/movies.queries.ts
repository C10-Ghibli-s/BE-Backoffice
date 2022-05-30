import { Movies, PrismaClient } from '@prisma/client';

type ResolverContext = {
  orm: PrismaClient;
};

export function showAllMovies(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Movies[]> {
  return context.orm.movies.findMany({
    include: { title: true },
  });
}

export function getAMovie(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
): Promise<Movies | null> {
  return context.orm.movies.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: {
      title: true,
      interactions: true,
      writers: true,
      directors: true,
      musicians: true,
    },
  });
}
