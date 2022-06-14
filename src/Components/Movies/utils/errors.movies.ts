import { UserInputError } from 'apollo-server-hapi';

export function isMovies(movie:object | null, id: string ) {
  if (!movie) {
    throw new UserInputError(`The User with id ${id}, does not exist.`);
  }
}

export function existUser(movie:object | null, data: string) {
  if (movie) {
    throw new UserInputError(`The User with nickname ${data} already exist`);
  }
}
