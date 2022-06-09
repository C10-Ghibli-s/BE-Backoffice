import { PrismaClient, Musicians } from '@prisma/client';
import { errorHandler } from '../../middleware';

type ResolverContext = {
  orm: PrismaClient;
};

export async function showAllMusicians(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Musicians[] | undefined> {
  let musicians: Array<Musicians>;
  try {
    musicians = await context.orm.musicians.findMany();
    return musicians;
  } catch (error) {
    errorHandler(error);
  }
}
export async function getAMusician(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
): Promise<Musicians | null> {
  const musician = await context.orm.musicians.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: { movies: true },
  });
  if (!musician) {
    throw new Error(`The Musician with id ${arg.id}, does not exist.`);
  }
  return musician;
}
