import { PrismaClient, Musicians } from '@prisma/client';

type ResolverContext = {
  orm: PrismaClient;
};

export async function createMusician(
  parent: unknown,
  { data }: { data: Pick<Musicians, 'name'> },
  context: ResolverContext
): Promise<Musicians | undefined> {
  const musician = await context.orm.writers.findUnique({
    where: { name: data.name },
  });
  if (musician === null) {
    return context.orm.musicians.create({
      data,
    });
  }
  throw new Error(`The Musician with name ${data.name} already exist`);
}

export async function updateMusician(
  parent: unknown,
  arg: { id: string; data: Musicians },
  context: ResolverContext
): Promise<Musicians | undefined> {
  let writer = await context.orm.musicians.findUnique({
    where: { id: parseInt(arg.id, 10) },
  });
  if (writer === null) {
    throw new Error(`The Musician with id ${arg.id} does not exist.`);
  }
  writer = await context.orm.musicians.findUnique({
    where: { name: arg.data.name },
  });
  if (writer === null) {
    return await context.orm.musicians.update({
      where: { id: parseInt(arg.id, 10) },
      data: arg.data,
    });
  }
  throw new Error(`The Musician with name ${arg.data.name} already exists.`);
}

export async function deleteMusician(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
) {
  const musician = await context.orm.musicians.findUnique({
    where: { id: parseInt(arg.id, 10) },
  });
  if (!musician) {
    throw new Error(`The Musician with id ${arg.id} does not exist.`);
  }
  await context.orm.musicians.delete({
    where: { id: parseInt(arg.id, 10) },
  });
  return `The Musician with ${arg.id} Id was deleted`;
}
