import { Movies } from '@prisma/client';
import { errorHandler } from '../../middleware';
import { unauthenticated, unauthorizedUserAdmin } from '../../utils/authorization.error';
import { ResolverContext } from '../../utils/typeContext';
import { isMovies } from './utils/errors.movies';

export async function showAllMovies(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Movies[] | undefined> {
  let movies: Array<Movies>;
  //* if the Users is logged.
  unauthenticated();
  unauthorizedUserAdmin();
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
  //* if the Users is logged.
  unauthenticated();
  unauthorizedUserAdmin();

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
  //* Validates if there is a movie.
  isMovies(movie, arg.id);
  return movie;
}
