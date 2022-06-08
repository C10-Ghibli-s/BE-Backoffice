import { Movies, PrismaClient } from '@prisma/client';
import { errorHandler } from '../../middleware';

type ResolverContext = {
  orm: PrismaClient;
};

export async function showAllMovies(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Movies[] | undefined> {
  let movies: Array<Movies>;
  try {
    movies = await context.orm.movies.findMany({
      include: {
        title: true,
      },
    });
    return movies;
  } catch (error) {
    errorHandler(error);
  }
}

export async function getAMovie(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
): Promise<Movies | null> {
  const movie = await context.orm.movies.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: {
      title: true,
      interactions: true,
      writers: true,
      directors: true,
      musicians: true,
    },
  });
  if (!movie) {
    throw new Error(`The Movie with id ${arg.id}, does not exist.`);
  }
  return movie;
}
