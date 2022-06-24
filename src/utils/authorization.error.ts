import { AuthenticationError, ForbiddenError } from 'apollo-server-hapi';
import { role } from '../auth/auth.strategy';

export const unauthenticated = () => {
  if (role == undefined) {
    //throw new AuthenticationError('Unauthenticated request.');
  }
};

export const unauthorizedSuper = () => {
  if (role !== 'SUPERADMIN') {
    //throw new ForbiddenError('You must have Super permissions to use resource.');
  }
};

export const unauthorizedAdmin = () => {
  if (role !== 'ADMIN') {
    // throw new ForbiddenError('You must have Admin permissions to use this resource.');
  }
};

export const unauthorizedSuperAdmin = () => {
  if (role !== 'ADMIN' && role === 'USER') {
    // throw new ForbiddenError('You must have the Admin or Super permissions to use this resource.');
  }
};

export const unauthorizedUserAdmin = () => {
  if (role !== 'USER' && role === 'SUPERADMIN') {
    // throw new ForbiddenError('You must have the User or Admin permissions to use this resource.');
  }
};
