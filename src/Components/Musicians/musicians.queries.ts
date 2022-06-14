import { Musicians } from '@prisma/client';
import { errorHandler } from '../../middleware';
import { ResolverContext } from '../../utils/typeContext';
import { unauthenticated } from '../../utils/authorization.error';
import { isMusicians } from './utils/errors.musicians';

export async function showAllMusicians(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Musicians[] | undefined> {
  unauthenticated();
  let musicians: Array<Musicians>;
  try {
    musicians = await context.orm.musicians.findMany();
    return musicians;
  } catch (error) {
    errorHandler(error);
  }
}
export async function getAMusician(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
): Promise<Musicians | null> {
  unauthenticated();
  const musician = await context.orm.musicians.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: { movies: true },
  });
  isMusicians(musician, arg);
  return musician;
}
