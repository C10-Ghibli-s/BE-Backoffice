import { gql } from 'apollo-server-hapi';
import * as queries from './directors.queries';
import * as mutations from './directors.mutations';

export const directorsTypeDefs = gql `

  type Directors {
    id: ID!
    name: String!
    movies: [Movies]
  }

  input DirectorInput {
    name: String!
  }

  input DirecotrEditInput {
    name: String
  }

  extend type Query {
    "Return all Directors"
    showAllDirectors: [Directors]
    "Return a Director"
    getADirector(id: ID!): Directors
  }

  extend type Mutation {
    "Create a Director"
    createDirector(data: DirectorInput!): Directors
    "Edit a Director"
    updateDirector(id: ID!, data: DirecotrEditInput!): Directors
    "Delete a Director"
    deleteDierctor(id: ID!): String
  }
`;

export const directorsResolvers = {
  Query: queries,
  Mutation: mutations,
};
