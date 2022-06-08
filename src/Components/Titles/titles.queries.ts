import { PrismaClient, Titles } from '@prisma/client';
import { errorHandler } from '../../middleware';

type ResolverContext = {
  orm: PrismaClient;
};

export async function showAllTitles(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Titles[] | undefined> {
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
  const titles = await context.orm.titles.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: { movie: true },
  });
  if (!titles) {
    throw new Error(`The Title with id ${arg.id}, does not exist.`);
  }
  return titles;
}

