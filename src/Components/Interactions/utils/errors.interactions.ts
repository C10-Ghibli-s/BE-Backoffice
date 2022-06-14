import { UserInputError } from 'apollo-server-hapi';

export function isInteractions(interaction:object | null, id: string ) {
  if (!interaction) {
    throw new UserInputError(`The Interaction with id ${id}, does not exist.`);
  }
}

export function existInteraction(interaction:object | null, data: string) {
  if (interaction) {
    throw new UserInputError(`The Interaction with name ${data} already exist`);
  }
}
