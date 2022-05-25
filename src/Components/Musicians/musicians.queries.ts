import { PrismaClient, Musicians } from '@prisma/client';

type ResolverContext = {
  orm: PrismaClient;
};

export function showAllMusicians(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Musicians[]> {
  return context.orm.musicians.findMany();
}
export function getAMusician(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
): Promise<Musicians | null> {
  return context.orm.musicians.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: { movies: true },
  });
}
