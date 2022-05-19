import { Users, PrismaClient } from '@prisma/client';

type ResolverContext = {
  orm: PrismaClient;
};

export function createUser(
  parent: unknown,
  {
    data,
  }: { data: Pick<Users, 'nickname' | 'password' | 'status' | 'roleId' > },
  context: ResolverContext
): Promise<Users> {
  const { nickname, password, status, roleId } = data;

  return context.orm.users.create({
    data: {
      nickname,
      password,
      status,
      roleId
    },
  });
}
