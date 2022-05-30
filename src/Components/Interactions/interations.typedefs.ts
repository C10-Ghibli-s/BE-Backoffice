import { gql } from 'apollo-server-hapi';
import * as mutations from './interactions.mutations';
import * as queries from './interactions.queries';

export const interactionsTypeDefs = gql`
  type Interactions {
    id: ID!
    scoreByEmoji: String
    scoreByStars: Float
    seenMark: Boolean!
    user: Users
    movie: Movies
    movieId: Int!
    userId: Int!
  }

  input InteractionInput {
    scoreByEmoji: String
    scoreByStars: Float
    seenMark: Boolean!
  }

  input InteractionEditInput {
    scoreByEmoji: String
    scoreByStars: Float
    seenMark: Boolean
    movieId: Int
    userId: Int
  }

  extend type Query {
    "Return all Interactions"
    showAllInteractions: [Interactions]
    "Return a Interaction"
    getAInteraction(id: ID!): Interactions
  }

  extend type Mutation {
    "Create an Interaction"
    createAnInteraction(data: InteractionInput!): Interactions
    "Makes an union between Users and Movies"
    addMoviesUsers(movieId: ID!, userId: ID!, interId: ID!): Interactions
    "Modify an Interaction"
    updateInteraction(id: ID!, data: InteractionEditInput!): Interactions
    "Delete an Interaction"
    deleteAnInteraction(id: ID!): String
  }
`;

export const interactionsResolvers = {
  Query: queries,
  Mutation: {
    createAnInteraction: mutations.createAnInteraction,
    addMoviesUsers: mutations.addMoviesUsers,
    updateInteraction: mutations.updateInteraction,
    deleteAnInteraction: mutations.deleteAnInteraction,
  },
  Interactions: mutations.resolver,
};
