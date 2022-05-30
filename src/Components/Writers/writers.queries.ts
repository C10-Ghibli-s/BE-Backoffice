import { PrismaClient, Writers } from '@prisma/client';

type ResolverContext = {
  orm: PrismaClient;
};

export function showAllWriters(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Writers[]> {
  return context.orm.writers.findMany();
}
export function getAWriter(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
): Promise<Writers | null> {
  return context.orm.writers.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: { movies: true },
  });
}
