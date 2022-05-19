import { PrismaClient, Roles } from '@prisma/client';

type ResolverContext = {
  orm: PrismaClient;
};

export function createRole(
  parent: unknown,
  { data }: { data: Pick<Roles, 'name' | 'status'> },
  context: ResolverContext
): Promise<Roles> {
  return context.orm.roles.create({
    data,
  });
}

export function updateRole(
  parent: unknown,
  arg: { id: string; data: { data: Pick<Roles, 'name' | 'status'> } },
  context: ResolverContext
): Promise<Roles> {
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
  await context.orm.roles.delete({
    where: { id: parseInt(arg.id, 10) },
  });
  return `The Role with ${arg.id} was deleted`;
}
