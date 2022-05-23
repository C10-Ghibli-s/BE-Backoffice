import { gql } from 'apollo-server-hapi';
import * as queries from './musicians.queries';
import * as mutations from './musicians.mutations';

export const musiciansTypeDefs = gql `

  type Musicians {
    id: ID!
    name: String!
    # movies: [Movies]
  }

  input MusicianInput {
    name: String!
  }

  input MusicianEditInput {
    name: String
  }

  extend type Query {
    "Return all Musicians"
    showAllMusicians: [Musicians]
    "Return a Musician"
    getAMusician(id: ID!): Musicians
  }

  extend type Mutation {
    "Create a Musician"
    createMusician(data: MusicianInput!): Musicians
    "Edit a Musician"
    updateMusician(id: ID!, data: MusicianEditInput!): Musicians
    "Delete a Musician"
    deleteMusician(id: ID!): String
  }
`;

export const musiciansResolvers = {
  Query: queries,
  Mutation: mutations,
};
