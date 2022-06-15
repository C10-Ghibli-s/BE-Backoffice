import { Musicians } from '@prisma/client';
import { ResolverContext } from '../../utils/typeContext';
import { unauthenticated, unauthorizedAdmin } from '../../utils/authorization.error';
import { existMusicians, isMusicians } from './utils/errors.musicians';

export async function createMusician(
  parent: unknown,
  { data }: { data: Pick<Musicians, 'name'> },
  context: ResolverContext
): Promise<Musicians | undefined> {
  unauthenticated();
  unauthorizedAdmin();
  const musician = await context.orm.musicians.findUnique({
    where: { name: data.name },
  });

  existMusicians(musician, data.name);
  return context.orm.musicians.create({
    data,
  });
}

export async function updateMusician(
  parent: unknown,
  arg: { id: string; data: Musicians },
  context: ResolverContext
): Promise<Musicians | undefined> {
  unauthenticated();
  unauthorizedAdmin();
  let musician = await context.orm.musicians.findUnique({
    where: { id: parseInt(arg.id, 10) },
  });
  isMusicians(musician, arg);
  musician = await context.orm.musicians.findUnique({
    where: { name: arg.data.name },
  });
  existMusicians(musician, arg.data.name);
  return await context.orm.musicians.update({
    where: { id: parseInt(arg.id, 10) },
    data: arg.data,
  });
}

export async function deleteMusician(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
) {
  unauthenticated();
  unauthorizedAdmin();
  const musician = await context.orm.musicians.findUnique({
    where: { id: parseInt(arg.id, 10) },
  });
  isMusicians(musician, arg);
  await context.orm.musicians.delete({
    where: { id: parseInt(arg.id, 10) },
  });
  return `The Musician with ${arg.id} Id was deleted`;
}
