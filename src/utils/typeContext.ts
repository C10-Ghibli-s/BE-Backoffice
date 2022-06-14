import { PrismaClient } from '@prisma/client';
//* Export the type of the Resolver context of Prisma
export type ResolverContext = {
  orm: PrismaClient
}
