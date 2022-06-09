import { PrismaClient, Directors } from '@prisma/client';

type ResolverContext = {
  orm: PrismaClient;
};

export async function createDirector(
  parent: unknown,
  { data }: { data: Pick<Directors, 'name'> },
  context: ResolverContext
): Promise<Directors | undefined> {
  const director = await context.orm.directors.findUnique({
    where: { name: data.name },
  });
  if (director === null) {
    return await context.orm.directors.create({
      data,
    });
  }
  throw new Error(`The Director with name ${data.name} already exists.`);
}

export async function updateDirector(
  parent: unknown,
  arg: { id: string; data: Directors },
  context: ResolverContext
): Promise<Directors | undefined> {
  let director = await context.orm.directors.findUnique({
    where: { id: parseInt(arg.id, 10) },
  });
  if (director === null) {
    throw new Error(`The Director with id ${arg.id} does not exist.`);
  }
  director = await context.orm.directors.findUnique({
    where: { name: arg.data.name },
  });
  if (director === null) {
    return context.orm.directors.update({
      where: { id: parseInt(arg.id, 10) },
      data: arg.data,
    });
  }
  throw new Error(`The Director with name ${arg.data.name} already exists.`);
}

export async function deleteDierctor(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
) {
  const director = await context.orm.directors.findUnique({
    where: { id: parseInt(arg.id, 10) },
  });
  if (!director) {
    throw new Error(`The Director with id ${arg.id} does not exist.`);
  }
  await context.orm.directors.delete({
    where: { id: parseInt(arg.id, 10) },
  });
  return `The Director with ${arg.id} Id was deleted`;
}
