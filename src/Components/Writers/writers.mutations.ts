import { Writers } from '@prisma/client';
import { ResolverContext } from '../../utils/typeContext';
import { existWriter, isWriters } from './utils/errors.writers';
import { unauthenticated, unauthorizedAdmin } from '../../utils/authorization.error';

export async function createWriter(
  parent: unknown,
  { data }: { data: Pick<Writers, 'name'> },
  context: ResolverContext
): Promise<Writers | undefined> {
  const writers = await context.orm.writers.findUnique({
    where: { name: data.name },
  });
  //* if the Users is logged.
  unauthenticated();
  unauthorizedAdmin();
  existWriter(writers, data.name);
  return context.orm.writers.create({
    data,
  });
}

export async function updateWriter(
  parent: unknown,
  arg: { id: string; data: Writers },
  context: ResolverContext
): Promise<Writers | undefined> {
  let writers = await context.orm.writers.findUnique({
    where: { id: parseInt(arg.id, 10) },
  });
  unauthenticated();
  unauthorizedAdmin();
  //* Validates if there is a writer.
  isWriters(writers, arg);
  writers = await context.orm.writers.findUnique({
    where: { name: arg.data.name },
  });
  existWriter(writers, arg.data.name);
  return await context.orm.writers.update({
    where: { id: parseInt(arg.id, 10) },
    data: arg.data,
  });
}

export async function deleteWriter(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
) {
  unauthenticated();
  unauthorizedAdmin();
  const writer = await context.orm.writers.findUnique({
    where: { id: parseInt(arg.id, 10) },
  });
  //* Validates if there is a writer.
  isWriters(writer, arg);
  await context.orm.writers.delete({
    where: { id: parseInt(arg.id, 10) },
  });
  return `The Writer with ${arg.id} Id was deleted`;
}
