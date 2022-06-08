import { PrismaClient, Writers } from '@prisma/client';

type ResolverContext = {
  orm: PrismaClient;
};

export async function createWriter(
  parent: unknown,
  { data }: { data: Pick<Writers, 'name'> },
  context: ResolverContext
): Promise<Writers | undefined> {
  const writers = await context.orm.writers.findUnique({
    where: { name: data.name },
  });
  if (writers === null) {
    return context.orm.writers.create({
      data,
    });
  }
  throw new Error(`The Writer with name ${data.name} already exist`);
}

export async function updateWriter(
  parent: unknown,
  arg: { id: string; data: Writers },
  context: ResolverContext
): Promise<Writers | undefined> {
  let writers = await context.orm.writers.findUnique({
    where: { id: parseInt(arg.id, 10) },
  });
  if (writers === null) {
    throw new Error(`The Writer with id ${arg.id} , does not exist.`);
  }
  writers = await context.orm.writers.findUnique({
    where: { name: arg.data.name },
  });
  if (writers === null) {
    return await context.orm.writers.update({
      where: { id: parseInt(arg.id, 10) },
      data: arg.data,
    });
  }
  throw new Error(`The Writer with name ${arg.data.name} already exists.`);
}

export async function deleteWriter(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
) {
  const director = await context.orm.writers.findUnique({
    where: { id: parseInt(arg.id, 10) },
  });
  if (!director) {
    throw new Error(`The Writer with id ${arg.id} , does not exist.`);
  }
  await context.orm.writers.delete({
    where: { id: parseInt(arg.id, 10) },
  });
  return `The Writer with ${arg.id} Id was deleted`;
}
