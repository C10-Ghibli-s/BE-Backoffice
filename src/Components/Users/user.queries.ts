import { Users } from '@prisma/client';
import { errorHandler } from '../../middleware';
import { ResolverContext } from '../../utils/typeContext';
import { unauthenticated, unauthorizedSuperAdmin } from '../../utils/authorization.error';
import { isUsers } from './utils/errors.users';

export async function showAllUsers(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Users[] | undefined> {
  unauthenticated();
  unauthorizedSuperAdmin();
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
  unauthenticated();
  const user = await context.orm.users.findUnique({
    where: { id: parseInt(arg.id, 10) },
    include: { role: true },
  });
  isUsers(user, arg.id);
  return user;
}
