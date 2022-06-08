import { PrismaClient, Users } from '@prisma/client';
import { errorHandler } from '../../middleware';

type ResolverContext = {
  orm: PrismaClient;
};

export async function showAllUsers(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Users[] | undefined> {
  let users: Array<Users>;
  try {
    users = await context.orm.users.findMany();
    return users;
  } catch (error) {
    errorHandler(error);
  }
}

export async function getAnUser(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
): Promise<Users | null> {
  const user = await context.orm.users.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: { role: true },
  });
  if (!user) {
    throw new Error(`The User with id ${arg.id}, does not exist.`);
  }
  return user;
}
