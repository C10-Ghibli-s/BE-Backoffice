import { UserInputError } from 'apollo-server-hapi';

export function isDirector(director:object | null, arg: { id: string }) {
  if (!director) {
    throw new UserInputError(`The Director with id ${arg.id}, does not exist.`);
  }
}
export function existDirector(director:object | null, data: string) {
  if (director) {
    throw new UserInputError(`The Director with name ${data} already exist`);
  }
}
