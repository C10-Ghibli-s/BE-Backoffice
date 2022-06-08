import { PrismaClient, Directors } from '@prisma/client';
import { errorHandler } from '../../middleware/index';

type ResolverContext = {
  orm: PrismaClient;
};

export async function showAllDirectors(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Directors[] | undefined> {
  let directors: Array<Directors>;
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
  const director = await context.orm.directors.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: { movies: true },
  });
  if (!director) {
    throw new Error(`The Director with id ${arg.id}, Does not exists.`);
  }
  return director;
}
