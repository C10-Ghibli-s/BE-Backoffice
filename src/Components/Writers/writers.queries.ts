import { PrismaClient, Writers } from '@prisma/client';
import { errorHandler } from '../../middleware';

type ResolverContext = {
  orm: PrismaClient;
};

export async function showAllWriters(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Writers[] | undefined> {
  let writers: Array<Writers>;
  try {
    writers = await context.orm.writers.findMany();
    return writers;
  } catch (error) {
    errorHandler(error);
  }
}
export async function getAWriter(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
): Promise<Writers | null> {
  const writers = await context.orm.writers.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: { movies: true },
  });
  if (!writers) {
    throw new Error(`The Writer with id ${arg.id}, does not exist.`);
  }
  return writers;
}
