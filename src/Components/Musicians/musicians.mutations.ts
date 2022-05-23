import { PrismaClient, Musicians } from '@prisma/client';

type ResolverContext = {
  orm: PrismaClient;
};

export function createMusician(
  parent: unknown,
  { data }: { data: Pick<Musicians, 'name'> },
  context: ResolverContext
): Promise<Musicians> {
  return context.orm.musicians.create({
    data,
  });
}

export function updateMusician(
  parent: unknown,
  arg: { id: string; data: { data: Pick<Musicians, 'name'> } },
  context: ResolverContext
): Promise<Musicians> {
  return context.orm.musicians.update({
    where: { id: parseInt(arg.id, 10) },
    data: arg.data,
  });
}

export async function deleteMusician(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
) {
  await context.orm.musicians.delete({
    where: { id: parseInt(arg.id, 10) },
  });
  return `The Musician with ${arg.id} Id was deleted`;
}
