import { gql } from 'apollo-server-hapi';
import * as mutations from './interactions.mutations';
import * as queries from './interactions.queries';

export const interactionsTypeDefs = gql`
  type Interactions {
    id: ID!
    scoreByEmoji: String
    scoreByStar: Float
    seenMark: Boolean
    user: Users
    # movie: Movies
  }

  input InteractionInput {
    scoreByEmoji: String
    scoreByStar: Float
    seenMark: Boolean!
  }

  input InteractionEditInput {
    scoreByEmoji: String
    scoreByStar: Float
    seenMark: Boolean!
  }

  type Query {
    "Return all Interactions"
    showAllInteractions: [Interactions]
    "Return a Interaction"
    getAInteraction(id: ID!): Interactions
  }

  type Mutation {
    "Create an Interaction"
    createAnInteraction(data: InteractionInput!): Interactions
    "Modify an Interaction"
    updateInteraction(id: ID!, data: InteractionEditInput!): Interactions
  }
`;

export const interactionsResolvers = {
  Query: queries,
  Mutation: mutations,
};
