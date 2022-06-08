import { Interactions, PrismaClient } from '@prisma/client';
import { errorHandler } from '../../middleware';

type ResolverContext = {
  orm: PrismaClient;
};

export async function showAllInteractions(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Interactions[] | undefined> {
  let interactions: Array<Interactions>;
  try {
    interactions = await context.orm.interactions.findMany();
    return interactions;
  } catch (error) {
    errorHandler(error);
  }
}

export async function getAInteraction(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
): Promise<Interactions | null> {
  const interaction = await context.orm.interactions.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: {
      user: true,
      movie: true,
    },
  });
  if (!interaction) {
    throw new Error(`The Interaction with id ${arg.id}, does not exist.`);
  }
  return interaction;
}
