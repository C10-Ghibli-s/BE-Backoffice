import { Directors } from '@prisma/client';
import { errorHandler } from '../../middleware/index';
import { ResolverContext } from '../../utils/typeContext';
import { unauthenticated } from '../../utils/authorization.error';
import { isDirector } from './utils/errors.directors';

export async function showAllDirectors(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Directors[] | undefined> {
  let directors: Array<Directors>;
  unauthenticated();
  try {
    directors = await context.orm.directors.findMany();
    return directors;
  } catch (error) {
    errorHandler(error);
  }
}
export async function getADirector(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
): Promise<Directors | null> {
  unauthenticated();
  const director = await context.orm.directors.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: { movies: true },
  });
  isDirector(director, arg);
  return director;
}
