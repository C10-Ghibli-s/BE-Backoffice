import { Movies, Roles, Users } from '@prisma/client';

export const types = {
  BaseModel: {
    __resolveType: (parent: {users: Users, movies: Movies, roles: Roles}) => {
      if (parent.users.nickname) {
        return 'Users';
      }
      if (parent.movies.filmDescription) {
        return 'Movies';
      }
      if (parent.roles.name) {
        return 'Roles';
      }
      return null;
    }
  },
};
