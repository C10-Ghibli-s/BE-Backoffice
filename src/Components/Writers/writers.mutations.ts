import { PrismaClient, Writers } from '@prisma/client';

type ResolverContext = {
  orm: PrismaClient;
};

export function createWriter(
  parent: unknown,
  { data }: { data: Pick<Writers, 'name'> },
  context: ResolverContext
): Promise<Writers> {
  return context.orm.writers.create({
    data,
  });
}

export function updateWriter(
  parent: unknown,
  arg: { id: string; data: { data: Pick<Writers, 'name'> } },
  context: ResolverContext
): Promise<Writers> {
  return context.orm.writers.update({
    where: { id: parseInt(arg.id, 10) },
    data: arg.data,
  });
}

export async function deleteWriter(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
) {
  await context.orm.writers.delete({
    where: { id: parseInt(arg.id, 10) },
  });
  return `The Writer with ${arg.id} Id was deleted`;
}
