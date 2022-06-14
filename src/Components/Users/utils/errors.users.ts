import { UserInputError } from 'apollo-server-hapi';

export function isUsers(user:object | null, id: string) {
  if (!user) {
    throw new UserInputError(`The User with id ${id}, does not exist.`);
  }
}

export function existUser(user:object | null, data: string) {
  if (user) {
    throw new UserInputError(`The User with nickname ${data} already exist`);
  }
}
