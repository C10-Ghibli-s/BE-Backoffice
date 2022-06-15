import { Interactions, Movies, Users } from '@prisma/client';
import { errorHandler } from '../../middleware';
import { ResolverContext } from '../../utils/typeContext';
import { unauthenticated, unauthorizedUserAdmin } from '../../utils/authorization.error';
import { isUsers } from '../Users/utils/errors.users';
import { isMovies } from '../Movies/utils/errors.movies';
import { isInteractions } from './utils/errors.interactions';

export async function createAnInteraction(
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
): Promise<Interactions | undefined> {
  unauthenticated();
  unauthorizedUserAdmin();
  try {
    return await context.orm.interactions.create({
      data,
    });
  } catch (error) {
    errorHandler(error);
  }
}

export async function addMoviesUsers(
  parent: unknown,
  arg: { movieId: string; userId: string; interId: string },
  context: ResolverContext
): Promise<Interactions | null> {
  unauthenticated();
  unauthorizedUserAdmin();
  const user = await context.orm.users.findUnique({
    where: { id: parseInt(arg.userId, 10) }
  });
  isUsers(user, arg.userId);
  const movie = await context.orm.movies.findUnique({
    where: { id: parseInt(arg.movieId, 10) }
  });
  isMovies(movie, arg.movieId);
  const interaction = await context.orm.interactions.findUnique({
    where: { id: parseInt(arg.interId, 10) }
  });
  isInteractions(interaction, arg.interId);
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

export async function updateInteraction(
  parent: unknown,
  arg: {
    id: string;
    data: Interactions;
  },
  context: ResolverContext
): Promise<Interactions> {
  unauthenticated();
  unauthorizedUserAdmin();
  const interaction = await context.orm.interactions.findUnique({
    where: { id: parseInt(arg.id, 10) }
  });
  isInteractions(interaction, arg.id);
  return await context.orm.interactions.update({
    where: { id: parseInt(arg.id, 10) },
    data: arg.data,
  });
}

export async function deleteAnInteraction(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
) {
  unauthenticated();
  unauthorizedUserAdmin();
  const interaction = await context.orm.interactions.findUnique({
    where: { id: parseInt(arg.id, 10) }
  });
  isInteractions(interaction, arg.id);
  await context.orm.interactions.delete({
    where: {
      id: parseInt(arg.id, 10),
    },
  });
  return `The Interaction with ${arg.id} was deleted.`;
}
