import { Writers } from '@prisma/client';
import { errorHandler } from '../../middleware';
import { ResolverContext } from '../../utils/typeContext';
import { unauthenticated, unauthorizedUserAdmin } from '../../utils/authorization.error';
import { isWriters } from './utils/errors.writers';

export async function showAllWriters(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Writers[] | undefined> {
  let writers: Array<Writers>;
  //* if the Users is logged.
  unauthenticated();
  unauthorizedUserAdmin();
  try {
    writers = await context.orm.writers.findMany();
    return writers;
  } catch (error) {
    errorHandler(error);
  }
}
export async function getAWriter(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
): Promise<Writers | null> {
  const writers = await context.orm.writers.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: { movies: true },
  });
  //* if the Users is logged.
  unauthenticated();
  unauthorizedUserAdmin();
  //* Validates if there is a writer.
  isWriters(writers, arg);
  return writers;
}
