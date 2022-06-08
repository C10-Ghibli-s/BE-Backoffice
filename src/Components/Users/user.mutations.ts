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
    data: Users;
  },
  context: ResolverContext
): Promise<Users | undefined> {
  const { nickname, password, profilePicture, status, roleId } = data;

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await context.orm.users.findUnique({
    where: { nickname: nickname },
  });
  if (user === null) {
    return await context.orm.users.create({
      data: {
        nickname,
        password: hashPassword,
        profilePicture,
        status,
        role: {
          connect: {
            id: roleId,
          },
        },
      },
      include: {
        role: true,
      },
    });
  }
  throw new Error(`The User with nickname ${nickname} already exist`);
}

export async function updateUser(
  parent: unknown,
  arg: {
    id: string;
    data: Users;
  },
  context: ResolverContext
): Promise<Users | undefined> {
  const { nickname, profilePicture, status, roleId } = arg.data;
  let user = await context.orm.users.findUnique({
    where: { id: parseInt(arg.id, 10) },
  });
  if (!user) {
    throw new Error(`The User with id ${arg.id} does not exists.`);
  }else if (nickname) {
    user = await context.orm.users.findUnique({
      where: { nickname: nickname },
    });
    if (user === null) {
      return context.orm.users.update({
        where: { id: parseInt(arg.id, 10) },
        data: {
          nickname: nickname,
          profilePicture: profilePicture,
          status: status,
          role: {
            connect: {
              id: roleId,
            },
          },
        },
        include: {
          role: true
        }
      });
    }
    throw new Error(`The User with nickname ${nickname} already exists.`);
  }
  return context.orm.users.update({
    where: { id: parseInt(arg.id, 10) },
    data: {
      nickname: nickname,
      profilePicture: profilePicture,
      status: status,
      role: {
        connect: {
          id: roleId,
        },
      },
    },
    include: {
      role: true
    }
  });
}

export async function deleteAnUser(
  paren: unknown,
  arg: { id: string },
  context: ResolverContext
) {
  const user = await context.orm.users.findUnique({
    where: { id: parseInt(arg.id, 10) },
  });
  if (!user) {
    throw new Error(`The User with id ${arg.id}, does not exist.`);
  }
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
