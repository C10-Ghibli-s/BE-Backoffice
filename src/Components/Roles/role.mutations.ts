import { PrismaClient, Roles } from '@prisma/client';
import { errorHandler } from '../../middleware';

type ResolverContext = {
  orm: PrismaClient;
};

export async function createRole(
  parent: unknown,
  { data }: { data: Pick<Roles, 'name' | 'status'> },
  context: ResolverContext
): Promise<Roles | undefined> {
  try {
    const role = await context.orm.roles.create({
      data,
    });
    return role;
  } catch (error) {
    errorHandler(error);
  }
}

export async function updateRole(
  parent: unknown,
  arg: { id: string; data: { data: Pick<Roles, 'name' | 'status'> } },
  context: ResolverContext
): Promise<Roles> {
  const role = await context.orm.roles.findUnique({
    where: { id: parseInt(arg.id, 10) }
  });
  if (!role) {
    throw new Error(`The Role with id ${arg.id}, does not exist.`);

  }
  return context.orm.roles.update({
    where: { id: parseInt(arg.id, 10) },
    data: arg.data,
  });
}

export async function deleteRole(
  parent: unknown,
  arg: { id: string },
  context: ResolverContext
) {
  const role = await context.orm.roles.findUnique({
    where: { id: parseInt(arg.id, 10) }
  });
  if (!role) {
    throw new Error(`The Role with id ${arg.id}, does not exist.`);

  }
  await context.orm.roles.delete({
    where: { id: parseInt(arg.id, 10) },
  });
  return `The Role with ${arg.id} Id was deleted`;
}
