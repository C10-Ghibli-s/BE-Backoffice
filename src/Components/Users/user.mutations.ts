import { Users, PrismaClient, Roles } from '@prisma/client';
import * as bcrypt from 'bcrypt';

type ResolverContext = {
  orm: PrismaClient;
};

export async function createUser(
  parent: unknown,
  {
    data,
  }: {
    data: Pick<Users, 'nickname' | 'password' | 'profilePicture' | 'status'> &
      Roles;
  },
  context: ResolverContext
): Promise<Users> {
  const { nickname, password, profilePicture, status, ...roles } = data;

  const hashPassword = await bcrypt.hash(password, 10);

  return context.orm.users.create({
    data: {
      nickname,
      password: hashPassword,
      profilePicture,
      status,
      role: {
        create: {
          ...roles,
        },
      },
    },
    include: {
      role: true,
    },
  });
}

export function updateUser(
  parent: unknown,
  arg: {
    id: string;
    data: Users & Roles;
  },
  context: ResolverContext
): Promise<Users> {
  const { nickname, profilePicture, status, ...roles } = arg.data;
  return context.orm.users.update({
    where: { id: parseInt(arg.id, 10) },
    data: {
      nickname: nickname,
      profilePicture: profilePicture,
      status: status,
      role: {
        update: {
          ...roles
        }
      }
    },
  });
}

export async function deleteAnUser(
  paren: unknown,
  arg: { id: string },
  context: ResolverContext
) {
  await context.orm.users.delete({
    where: { id: parseInt(arg.id, 10) },
  });
  return `The User with the ${arg.id} was deleted.`;
}

export const resolver: Record<
  keyof (Users & { role: Roles }),
  (parent: Users & { role: Roles }) => unknown
> = {
  id: (parent) => parent.id,
  createdAt: (parent) => parent.createdAt,
  updatedAt: (parent) => parent.updatedAt,
  nickname: (parent) => parent.nickname,
  password: (parent) => parent.password,
  profilePicture: (parent) => parent.profilePicture,
  status: (parent) => parent.status,
  roleId: (parent) => parent.role.id,
  role: (parent) => ({
    name: parent.role.name,
    status: parent.role.status,
  }),
};
