import { Movies, PrismaClient, Titles } from '@prisma/client';

type ResolverContext = {
  orm: PrismaClient;
};

export function createTitle(
  parent: unknown,
  {
    data,
  }: {
    data: Pick<Titles, 'title' | 'originalTitle' | 'romajiTitle' | 'movieId'>;
  },
  context: ResolverContext
): Promise<Titles> {
  return context.orm.titles.create({
    data,
  });
}

/* export function updateTitle(
  parent: unknown,
  arg: { id: string; data: { data: Pick<Titles, 'title' | 'originalTitle'> } },
  context: ResolverContext
): Promise<Titles> {
  return context.orm.titles.update({
    where: { id: parseInt(arg.id, 10) },
    data: arg.data,
  });
} */

export const resolver: Record<
  keyof (Titles & { movie: Movies }),
  (parent: Titles & { movie: Movies }) => unknown
> = {
  id: (parent) => parent.id,
  title: (parent) => parent.title,
  originalTitle: (parent) => parent.originalTitle,
  romajiTitle: (parent) => parent.romajiTitle,
  movieId: (parent) => parent.movie.id,
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
};

export async function deleteTitle(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
) {
  await context.orm.titles.delete({
    where: { id: parseInt(arg.id, 10) },
  });
  return `The Title with ${arg.id} Id was deleted`;
}
