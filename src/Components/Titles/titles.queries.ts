import { Titles } from '@prisma/client';
import { errorHandler } from '../../middleware';
import { ResolverContext } from '../../utils/typeContext';
import { unauthenticated } from '../../utils/authorization.error';
import { isTitles } from './utils/errors.titles';

export async function showAllTitles(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Titles[] | undefined> {
  unauthenticated();
  let titles: Array<Titles>;
  try {
    titles = await context.orm.titles.findMany();
    return titles;
  } catch (error) {
    errorHandler(error);
  }
}
export async function getATitle(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
): Promise<Titles | null> {
  unauthenticated();
  const titles = await context.orm.titles.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: { movie: true },
  });
  isTitles(titles, arg);
  return titles;
}

