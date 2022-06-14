import { UserInputError } from 'apollo-server-hapi';

export function isMusicians(musician:object | null, arg: { id: string }) {
  if (!musician) {
    throw new UserInputError(`The Musician with id ${arg.id}, does not exist.`);
  }
}

export function existMusicians(musician:object | null, data: string) {
  if (musician) {
    throw new UserInputError(`The Musician with name ${data} already exist`);
  }
}
