import { Interactions, PrismaClient } from '@prisma/client';

type ResolverContext = {
  orm: PrismaClient;
};

export function createAnInteraction(
  parent: unknown,
  {
    data,
  }: {
    data: Pick<
      Interactions,
      'seenMark' | 'scoreByEmoji' | 'scoreByStars' | 'movieId' | 'userId'
    >;
  },
  context: ResolverContext
): Promise<Interactions> {
  return context.orm.interactions.create({
    data,
  });
}

/* export function updateInteraction(
  parent: unknown,
  arg: {
    id: string;
    data: {
      data: Pick<
        Interactions,
        'movieId' | 'scoreByEmoji' | 'scoreByStars' | 'seenMark' | 'userId'
      >;
    };
  },
  context: ResolverContext
): Promise<Interactions> {
  return context.orm.interactions.update({
    where: { id: parseInt(arg.id, 10) },
    data: arg.data,
  });
} */
