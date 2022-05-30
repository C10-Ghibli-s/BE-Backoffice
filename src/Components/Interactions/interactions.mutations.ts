import { Interactions, Movies, PrismaClient, Users } from '@prisma/client';

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

export function addMoviesUsers(
  parent: unknown,
  arg: { movieId: string; userId: string; interId: string },
  context: ResolverContext
): Promise<Interactions | null> {
  return context.orm.interactions.update({
    where: { id: parseInt(arg.interId, 10) },
    data: {
      user: {
        connect: {
          id: parseInt(arg.userId, 10),
        },
      },
      movie: {
        connect: {
          id: parseInt(arg.movieId, 10),
        },
      },
    },
    include: { user: true, movie: true },
  });
}

export const resolver: Record<
  keyof (Interactions & { user: Users } & { movie: Movies }),
  (parent: Interactions & { user: Users } & { movie: Movies }) => unknown
> = {
  id: (parent) => parent.id,
  scoreByEmoji: (parent) => parent.scoreByEmoji,
  scoreByStars: (parent) => parent.scoreByStars,
  seenMark: (parent) => parent.seenMark,
  movieId: (parent) => parent.movie.id,
  userId: (parent) => parent.user.id,
  movie: (parent) => ({
    filmDescription: parent.movie.filmDescription,
    movieBanner: parent.movie.movieBanner,
    audienceScore: parent.movie.audienceScore,
    releaseDate: parent.movie.releaseDate,
    userName: parent.movie.userName,
    linkWiki: parent.movie.linkWiki,
    duration: parent.movie.duration,
    status: parent.movie.status,
  }),
  user: (parent) => ({
    nickname: parent.user.nickname,
    password: parent.user.password,
    profilePicture: parent.user.profilePicture,
    status: parent.user.status,
  }),
};

export function updateInteraction(
  parent: unknown,
  arg: {
    id: string;
    data: Interactions;
  },
  context: ResolverContext
): Promise<Interactions> {
  return context.orm.interactions.update({
    where: { id: parseInt(arg.id, 10) },
    data: arg.data,
  });
}

export async function deleteAnInteraction(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
) {
  await context.orm.interactions.delete({
    where: {
      id: parseInt(arg.id, 10),
    },
  });
  return `The Interaction with ${arg.id} was deleted.`;
}
