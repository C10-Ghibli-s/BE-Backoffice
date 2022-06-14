import { Movies, Titles } from '@prisma/client';
import { ResolverContext } from '../../utils/typeContext';
import { unauthenticated } from '../../utils/authorization.error';
import { existTitles, isTitles } from './utils/errors.titles';

export function createTitle(
  parent: unknown,
  {
    data,
  }: {
    data: Pick<Titles, 'title' | 'originalTitle' | 'romajiTitle' | 'movieId'>;
  },
  context: ResolverContext
): Promise<Titles> {
  unauthenticated();
  return context.orm.titles.create({
    data,
  });
}

export async function updateTitle(
  parent: unknown,
  arg: { id: string; data: Titles; },
  context: ResolverContext
): Promise<Titles> {
  unauthenticated();
  let title = await context.orm.titles.findUnique({
    where: { id: parseInt(arg.id, 10) },
  });
  isTitles(title, arg);
  title = await context.orm.titles.findUnique({
    where: { title: arg.data.title },
  });
  const originalTitle = await context.orm.titles.findUnique({
    where: { originalTitle: arg.data.originalTitle },
  });
  existTitles(title, originalTitle, arg.data.title, arg.data.originalTitle);
  return context.orm.titles.update({
    where: { id: parseInt(arg.id, 10) },
    data: arg.data,
    include: {
      movie: true
    }
  });

}

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
  unauthenticated();
  const title = await context.orm.titles.findUnique({
    where: { id: parseInt(arg.id, 10) }
  });
  isTitles(title, arg);
  await context.orm.titles.delete({
    where: { id: parseInt(arg.id, 10) },
  });
  return `The Title with ${arg.id} Id was deleted`;
}
