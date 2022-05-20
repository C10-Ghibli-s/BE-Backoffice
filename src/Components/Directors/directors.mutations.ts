import { PrismaClient, Directors } from '@prisma/client';

type ResolverContext = {
  orm: PrismaClient;
};

export function createDirector(
  parent: unknown,
  { data }: { data: Pick<Directors, 'name'> },
  context: ResolverContext
): Promise<Directors> {
  return context.orm.directors.create({
    data,
  });
}

export function updateDirector(
  parent: unknown,
  arg: { id: string; data: { data: Pick<Directors, 'name'> } },
  context: ResolverContext
): Promise<Directors> {
  return context.orm.directors.update({
    where: { id: parseInt(arg.id, 10) },
    data: arg.data,
  });
}

export async function deleteDierctor(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
) {
  await context.orm.directors.delete({
    where: { id: parseInt(arg.id, 10) },
  });
  return `The Director with ${arg.id} Id was deleted`;
}
