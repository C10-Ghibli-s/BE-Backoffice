import { Interactions } from '@prisma/client';
import { errorHandler } from '../../middleware';
import { ResolverContext } from '../../utils/typeContext';
import { unauthenticated } from '../../utils/authorization.error';
import { isInteractions } from './utils/errors.interactions';

export async function showAllInteractions(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Interactions[] | undefined> {
  unauthenticated();
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
  unauthenticated();
  const interaction = await context.orm.interactions.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: {
      user: true,
      movie: true,
    },
  });
  isInteractions(interaction, arg.id);
  return interaction;
}
