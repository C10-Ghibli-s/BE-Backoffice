import { PrismaClient, Titles } from '@prisma/client';

type ResolverContext = {
  orm: PrismaClient;
};

export function createTitle(
  parent: unknown,
  { data }: { data: Pick<Titles, 'title' | 'originalTitle' | 'romajiTitle' | 'movieId'> },
  context: ResolverContext
): Promise<Titles> {
  return context.orm.titles.create({
    data,
  });
}

/* export function updateTitle(
  parent: unknown,
  arg: { id: string; data: { data: Pick<Titles, 'title' | 'originalTitle'> } },
  context: ResolverContext
): Promise<Titles> {
  return context.orm.titles.update({
    where: { id: parseInt(arg.id, 10) },
    data: arg.data,
  });
} */

export async function deleteTitle(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
) {
  await context.orm.titles.delete({
    where: { id: parseInt(arg.id, 10) },
  });
  return `The Title with ${arg.id} Id was deleted`;
}
