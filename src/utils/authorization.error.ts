import { AuthenticationError } from 'apollo-server-hapi';
import { role } from '../auth/auth.strategy';

export const unauthenticated = () => {
  if (role == undefined) {
    throw new AuthenticationError('Unauthenticated request.');
  }
};

