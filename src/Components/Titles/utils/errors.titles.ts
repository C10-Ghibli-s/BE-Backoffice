import { UserInputError } from 'apollo-server-hapi';

export function isTitles(title: object | null, arg: { id: string }) {
  if (!title) {
    throw new UserInputError(`The Title with id ${arg.id}, does not exist.`);
  }
}

export function existTitles(
  title: object | null,
  originalTitle: object | null,
  dataT: string,
  dataO: string
) {
  if (title) {
    throw new Error(`The Movie with title ${dataT} already exists.`);
  } else if (originalTitle) {
    throw new Error(`The Movie with Original Title ${dataO} already exists.`);
  }
}
