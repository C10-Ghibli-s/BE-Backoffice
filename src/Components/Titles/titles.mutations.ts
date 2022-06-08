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

export async function updateTitle(
  parent: unknown,
  arg: { id: string; data: Titles; },
  context: ResolverContext
): Promise<Titles> {
  let title = await context.orm.titles.findUnique({
    where: { id: parseInt(arg.id, 10) },
  });
  if (title === null) {
    throw new Error(`The Title with id ${arg.id} does not exist.`);
  }
  title = await context.orm.titles.findUnique({
    where: { title: arg.data.title },
  });
  const originalTitle = await context.orm.titles.findUnique({
    where: { originalTitle: arg.data.originalTitle },
  });
  if (title === null && originalTitle === null) {
    return context.orm.titles.update({
      where: { id: parseInt(arg.id, 10) },
      data: arg.data,
      include: {
        movie: true
      }
    });
  }else if (originalTitle) {
    throw new Error(`The Movie with Original Title ${arg.data.originalTitle} already exists.`);
  }
  throw new Error(`The Movie with title ${arg.data.title} already exists.`);
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
  const title = await context.orm.titles.findUnique({
    where: { id: parseInt(arg.id, 10) }
  });
  if (!title) {
    throw new Error(`The Title with ${arg.id}, does not exist.`);
  }
  await context.orm.titles.delete({
    where: { id: parseInt(arg.id, 10) },
  });
  return `The Title with ${arg.id} Id was deleted`;
}
