import { UserInputError } from 'apollo-server-hapi';

export function isWriters(writer:object | null, arg: { id: string }) {
  if (!writer) {
    throw new UserInputError(`The Writer with id ${arg.id}, does not exist.`);
  }
}

export function existWriter(writer:object | null, data: string) {
  if (writer) {
    throw new UserInputError(`The Writer with name ${data} already exist`);
  }
}
