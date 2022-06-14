import { UserInputError } from 'apollo-server-hapi';

export function isRoles(role:object | null, arg: { id: string }) {
  if (!role) {
    throw new UserInputError(`The Role with id ${arg.id}, does not exist.`);
  }
}

export function existRole(role:object | null, data: string) {
  if (role) {
    throw new UserInputError(`The Role with name ${data} already exist`);
  }
}
